"use client";

export default function LinearLoadingProgress(
  props: React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      viewBox="0 0 400 16"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="i0"
          gradientUnits="userSpaceOnUse"
          spreadMethod="pad"
          x2="195"
          y2="4"
          x1="0"
          y1="4"
        >
          <stop stopOpacity="0" offset="0%" stopColor="#8268ff" />
          <stop offset="50%" stopColor="#8268ff" />
          <stop stopOpacity="0" offset="100%" stopColor="#8268ff" />
        </linearGradient>
        <linearGradient
          id="i1"
          gradientUnits="userSpaceOnUse"
          spreadMethod="pad"
          x2="195"
          y2="4"
          x1="0"
          y1="4"
        >
          <stop stopOpacity="0" offset="0%" stopColor="#8268ff" />
          <stop offset="50%" stopColor="#8268ff" />
          <stop stopOpacity="0" offset="100%" stopColor="#8268ff" />
        </linearGradient>
      </defs>
      <g transform="matrix(1,0,0,1,205,8)" id="i2">
        <rect
          ry="4"
          rx="4"
          height="8"
          width="403"
          y="-4"
          x="-201.5"
          fillRule="evenodd"
          fill="#e0e0e0"
        />
      </g>
      <g id="i3">
        <g transform="translate(101,8)">
          <animateTransform
            repeatCount="indefinite"
            type="translate"
            attributeName="transform"
            dur="2s"
            begin="0s"
            calcMode="spline"
            values="101 8; 205 8; 309 8"
            keyTimes="0; 0.5; 1"
            keySplines="0 0 1 1; 0 0 1 1"
            fill="freeze"
          />
          <g transform="rotate(-360) translate(-97.5,-4)">
            <g id="i4" transform="matrix(1,0,0,1,0,0)">
              <rect
                ry="4"
                rx="4"
                height="8"
                width="195"
                y="0"
                x="0"
                fill="url(#i0)"
              />
            </g>
          </g>
        </g>
      </g>
      <g id="i3">
        <g transform="translate(101,8)">
          <animateTransform
            repeatCount="indefinite"
            type="translate"
            attributeName="transform"
            dur="2s"
            begin="0s"
            calcMode="spline"
            values="101 8; 205 8; 309 8"
            keyTimes="0; 0.5; 1"
            keySplines="0 0 1 1; 0 0 1 1"
            fill="freeze"
          />
          <g transform="rotate(-360) translate(-97.5,-4)">
            <g id="i4" transform="matrix(1,0,0,1,0,0)">
              <rect
                ry="4"
                rx="4"
                height="8"
                width="195"
                y="0"
                x="0"
                fill="url(#i1)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
