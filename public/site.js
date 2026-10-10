// 覓谷資訊 — 等高線畫布（marching squares）與捲動顯示。
(() => {
	const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

	// ── value noise ──
	const hash = (i, j) => {
		let h = (i * 374761393 + j * 668265263) | 0;
		h = Math.imul(h ^ (h >>> 13), 1274126177);
		return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
	};
	const smooth = (t) => t * t * (3 - 2 * t);
	const noise = (x, y) => {
		const xi = Math.floor(x), yi = Math.floor(y);
		const xf = smooth(x - xi), yf = smooth(y - yi);
		const a = hash(xi, yi), b = hash(xi + 1, yi);
		const c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
		return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
	};
	const fbm = (x, y) => {
		let sum = 0, amp = 0.5, f = 1;
		for (let o = 0; o < 4; o++) {
			sum += amp * noise(x * f, y * f);
			f *= 2.03;
			amp *= 0.5;
		}
		return sum;
	};

	// 每種畫布的地形。u 以高度為單位（u ∈ [0, aspect]），v ∈ [0, 1]。
	const terrains = {
		hero: {
			valley: (v, aspect) => aspect * 0.7 + 0.12 * Math.sin(v * 2.6 + 0.4),
			height(u, v, t, aspect) {
				const d = u - this.valley(v, aspect);
				return 1.5 * (1 - Math.exp(-d * d * 5)) + 0.6 * fbm(u * 1.5 + t * 0.018, v * 1.5 - t * 0.012) + 0.3 * v;
			},
			step: 0.055,
		},
		name: {
			height: (u, v, t) => 1.2 * fbm(u * 1.2 - t * 0.01, v * 1.2 + t * 0.008) + 0.4 * Math.hypot(u - 0.4, v - 0.5),
			step: 0.045,
		},
		lost: {
			height: (u, v, t) => fbm(u * 1.8 + t * 0.015, v * 1.8) + 0.5 * Math.hypot(u - 1.2, v - 0.6),
			step: 0.05,
		},
	};

	function setup(canvas) {
		const terrain = terrains[canvas.dataset.topo];
		if (!terrain) return;
		const ctx = canvas.getContext("2d");
		const css = getComputedStyle(document.documentElement);
		const dark = canvas.classList.contains("topo--dark");
		const ink = (dark ? css.getPropertyValue("--night-ink") : css.getPropertyValue("--ink")).trim();
		const seal = css.getPropertyValue("--seal").trim();
		const isHero = canvas.dataset.topo === "hero";

		let w = 0, h = 0, dpr = 1, cell = 10, cols = 0, rows = 0, field = null;
		const pointer = { x: -9, y: -9, tx: -9, ty: -9 };

		const resize = () => {
			dpr = Math.min(devicePixelRatio || 1, 2);
			w = canvas.clientWidth;
			h = canvas.clientHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			cell = w < 700 ? 8 : 10;
			cols = Math.ceil(w / cell) + 1;
			rows = Math.ceil(h / cell) + 1;
			field = new Float32Array(cols * rows);
		};

		const draw = (t) => {
			if (!w || !h) return;
			const aspect = w / h;
			let min = Infinity, max = -Infinity;
			pointer.x += (pointer.tx - pointer.x) * 0.08;
			pointer.y += (pointer.ty - pointer.y) * 0.08;

			for (let j = 0; j < rows; j++) {
				const v = (j * cell) / h;
				for (let i = 0; i < cols; i++) {
					const u = (i * cell) / h;
					let z = terrain.height(u, v, t, aspect);
					if (isHero) {
						const dx = u - pointer.x, dy = v - pointer.y;
						z += 0.45 * Math.exp(-(dx * dx + dy * dy) * 40);
					}
					field[j * cols + i] = z;
					if (z < min) min = z;
					if (z > max) max = z;
				}
			}

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			ctx.strokeStyle = ink;
			ctx.lineJoin = "round";

			const step = terrain.step;
			const first = Math.ceil(min / step);
			for (let k = first; k * step < max; k++) {
				const level = k * step;
				const major = k % 5 === 0;
				ctx.globalAlpha = dark ? (major ? 0.32 : 0.14) : major ? 0.5 : 0.22;
				ctx.lineWidth = major ? 1.3 : 0.7;
				ctx.beginPath();
				for (let j = 0; j < rows - 1; j++) {
					for (let i = 0; i < cols - 1; i++) {
						const a = field[j * cols + i], b = field[j * cols + i + 1];
						const c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
						const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
						if (idx === 0 || idx === 15) continue;
						const x = i * cell, y = j * cell;
						// 邊上的線性內插點：上、右、下、左
						const top = () => [x + cell * ((level - a) / (b - a)), y];
						const right = () => [x + cell, y + cell * ((level - b) / (c - b))];
						const bottom = () => [x + cell * ((level - d) / (c - d)), y + cell];
						const left = () => [x, y + cell * ((level - a) / (d - a))];
						const seg = (p, q) => {
							ctx.moveTo(p[0], p[1]);
							ctx.lineTo(q[0], q[1]);
						};
						switch (idx) {
							case 1: case 14: seg(left(), bottom()); break;
							case 2: case 13: seg(bottom(), right()); break;
							case 3: case 12: seg(left(), right()); break;
							case 4: case 11: seg(top(), right()); break;
							case 6: case 9: seg(top(), bottom()); break;
							case 7: case 8: seg(left(), top()); break;
							case 5: seg(left(), top()); seg(bottom(), right()); break;
							case 10: seg(top(), right()); seg(left(), bottom()); break;
						}
					}
				}
				ctx.stroke();
			}

			if (isHero) drawTrail(aspect, t);

			// 讓文字區後方的線條淡出
			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = "destination-out";
			const g = w > 960 ? ctx.createLinearGradient(0, 0, w * 0.62, 0) : ctx.createLinearGradient(0, 0, 0, h);
			g.addColorStop(0, `rgba(0,0,0,${dark ? 0 : 0.8})`);
			g.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, w, h);
			ctx.globalCompositeOperation = "source-over";
		};

		// 沿著谷底的紅色虛線路線與目的地
		const drawTrail = (aspect, t) => {
			ctx.globalAlpha = 0.85;
			ctx.strokeStyle = seal;
			ctx.lineWidth = 1.6;
			ctx.setLineDash([5, 6]);
			ctx.lineDashOffset = -t * 6;
			ctx.beginPath();
			for (let v = 1.02; v >= 0.3; v -= 0.01) {
				const x = terrains.hero.valley(v, aspect) * h, y = v * h;
				v > 1.01 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
			}
			ctx.stroke();
			ctx.setLineDash([]);
			const dx = terrains.hero.valley(0.3, aspect) * h, dy = 0.3 * h;
			const pulse = (t * 0.5) % 1;
			ctx.fillStyle = seal;
			ctx.beginPath();
			ctx.arc(dx, dy, 5, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalAlpha = 0.6 * (1 - pulse);
			ctx.beginPath();
			ctx.arc(dx, dy, 5 + pulse * 22, 0, Math.PI * 2);
			ctx.stroke();
			ctx.strokeStyle = ink;
		};

		resize();
		new ResizeObserver(() => {
			resize();
			draw(performance.now() / 1000);
		}).observe(canvas);

		if (isHero && !reduceMotion) {
			const host = canvas.parentElement;
			host.addEventListener("pointermove", (e) => {
				const r = canvas.getBoundingClientRect();
				pointer.tx = (e.clientX - r.left) / r.height;
				pointer.ty = (e.clientY - r.top) / r.height;
			});
			host.addEventListener("pointerleave", () => {
				pointer.tx = pointer.ty = -9;
			});
		}

		if (reduceMotion) {
			draw(0);
			return;
		}

		// 只在畫面可見時以約 24fps 更新
		let visible = false, last = 0;
		new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
		}).observe(canvas);
		const loop = (now) => {
			if (visible && now - last > 42) {
				last = now;
				draw(now / 1000);
			}
			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	}

	document.querySelectorAll("canvas[data-topo]").forEach(setup);

	// ── scroll reveal ──
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					e.target.classList.add("is-in");
					io.unobserve(e.target);
				}
			}
		},
		{ rootMargin: "0px 0px -10% 0px" },
	);
	document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
