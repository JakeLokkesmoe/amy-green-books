import React from "react";

export default function Hero({ title, subtitle, image }) {
  return (
    <div class="pt5 pb3-ns ph3 center mw7 flex flex-wrap">
      <div class="w-100 w-30-ns">
        <img src={image} alt={title} class="db mw5 center w-100 br1" />
      </div>
      <div class="w-100 w-70-ns flex items-center flex-wrap justify-center justify-start-ns">
        <div class="pl4-ns pv3">
          <div class="relative mb3">
            <h1 class="f2 f1-l b di lh-title mb3 mw6 primary">{title}</h1>
          </div>
          <div class="relative">
            {subtitle && (
              <p class="f4 fw5 di lh-title mb3 mw6 grey-3">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}