export const STREAM_CONVERGENCE_VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const STREAM_CONVERGENCE_FRAGMENT_SHADER = `
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_interactive_fidelity;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  
  // Perspective convergence warp towards center-horizon
  float z = 1.0 / (abs(uv.y + 0.3) + 0.06);
  vec2 p = vec2(uv.x * z * 0.85, z * 0.45 + u_time * 1.1);
  
  vec3 col = vec3(0.0);
  float maxIter = mix(4.0, 7.0, clamp(u_interactive_fidelity, 0.0, 1.0));
  
  for (float i = 1.0; i <= 7.0; i += 1.0) {
    if (i > maxIter) break;
    
    // Wave and stream line distortion
    vec2 st = p * (0.75 + i * 0.28);
    st.x += sin(st.y * 1.4 + u_time * 0.75 + i * 1.15) * 0.45;
    st.y += cos(st.x * 1.15 - u_time * 0.55 + i * 0.85) * 0.35;
    
    // Convergence neon stream lines
    float line = abs(sin(st.x * 3.8 + st.y * 1.9));
    line = 0.022 / (line + 0.04);
    
    // Dynamic futuristic color palette: Teal Cyan, Electric Violet, Royal Sapphire, Mint
    vec3 streamColor = 0.5 + 0.5 * cos(vec3(0.0, 1.1, 2.3) + i * 0.65 + u_time * 0.25 + uv.x * 1.8);
    streamColor = mix(streamColor, vec3(0.05, 0.95, 0.82), 0.5);
    
    col += streamColor * line * (1.1 / i) * smoothstep(2.6, 0.05, abs(uv.y + 0.3));
  }
  
  // Horizon glowing aura
  float centerDist = length(vec2(uv.x * 1.3, uv.y + 0.3));
  float centerGlow = 0.07 / (centerDist + 0.14);
  col += vec3(0.08, 0.85, 0.92) * centerGlow * 0.55;
  
  // Soft radial vignette
  float alpha = smoothstep(1.7, 0.15, length(uv));
  col *= alpha;
  
  gl_FragColor = vec4(col, clamp(length(col) * 0.9, 0.0, 1.0));
}
`;
