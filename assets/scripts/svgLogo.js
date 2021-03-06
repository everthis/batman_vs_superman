export let svgLogo = `
<div class="logo">
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 598.049 280.554" style="enable-background:new 0 0 598.049 280.554;"
     xml:space="preserve">
  <defs>
    <filter id="blur-filter" x="-6" y="-6" width="200" height="200">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
    <filter id="superman-inner-shadow">
      <feOffset dx="0" dy="0" />
      <feGaussianBlur
        stdDeviation="1"
        result="offset-blur"
      />
      <feComposite
        operator='out'
        in='SourceGraphic'
        in2='offset-blur'
        result='inverse'
      />
      <feFlood
        flood-color='ff0000'
        flood-opacity='1'
        result='color'
      />
    
      <!-- Clip color inside shadow -->
      <feComposite
        operator='in'
        in='color'
        in2='inverse'
        result='shadow'
      />
    
      <!-- Put shadow over original object -->
      <feComposite
        operator='over'
        in='shadow'
        in2='SourceGraphic'
      />
    </filter>
  </defs>
    <path style="fill:#000000;" d="M169.526,192.054l-44.001,3.498l-16.5,19.002l-15-14.502l-45.999,10.5c-33.501,8.499-48,40.002-48,40.002
      c-1.5-82.5,62.499-164.285,62.499-164.285C94.025,35.483,156.465,0,156.465,0l3.475,18.995c0,0,2.546,9.035,25.248,14.826
      l35.675,11.351h30.577V20.616l12.973,17.834l69.224,0.002l12.973-17.836V45.17h30.577l35.675-11.35
      c22.702-5.791,25.248-14.826,25.248-14.826L441.584,0c0,0,62.44,35.483,93.94,86.267c0,0,63.999,81.787,62.499,164.287
      c0,0-14.499-31.503-48-40.002l-45.999-10.5l-15,14.502l-16.5-19.002l-44.001-3.498l-129.5,87L169.526,192.054z" class="batman-logo"/>
    <path style="fill:none;stroke:#FFFFFF;stroke-width:3;stroke-miterlimit:10;" d="M399.716,66.828" />
    <path style="fill:#FF0000;" d="M299.025,280.554c-139.5-102-171.565-154.714-171.565-154.714
      c16.576-36.416,62.534-69.313,62.534-69.313c70.471-11.533,218.062,0,218.062,0s45.958,32.898,62.534,69.313
      c0,0-31.89,52.421-170.411,153.87L299.025,280.554z M429.798,154.51c6.955-7.204,13.163-14.112,18.258-20.487
      c0,0-37.529-60.722-115.28-65.972c0,0-93.752-7.498-102.752,16.001c0,0-6.502,20.751,56,20.25c0,0,82.251,1.497,104.001,14.499
      c0,0,28.248,12.75,38.499,32.001L429.798,154.51z M452.439,128.284c1.131-1.556,2.18-3.073,3.141-4.547
      c0,0-12.571-20.115-36.226-42.769c0,0,4.04,13.428,14.842,25.288L452.439,128.284z M203.523,66.828h-8.845
      c-33.935,27.671-52.207,56.909-52.207,56.909c4.504,6.908,19.447,34.673,18.687,23.244
      C157.794,96.409,203.523,66.828,203.523,66.828z M299.025,228.438c62.092-4.474,57.381-20.101,57.381-20.101
      c-1.324-20.364-67.175-16.661-67.175-16.661c-38.877,2.909-98.073-14.757-98.073-14.757c9.851,9.196,19.299,19.802,29.963,28.254
      c0,0,35.399,23.651,73.901,23.265H299.025z M332.606,238.712c-20.098,4.723-69.735,0-69.735,0
      c21.041,17.062,36.155,28.594,36.155,28.594L332.606,238.712z M397.524,77.301c10.5,3.25,6.999-6,6.999-6
      c-3.501-10.25-43.998-5.751-43.998-5.751C378.276,69.8,397.524,77.301,397.524,77.301z" class="superman loading"/>
  </svg>
</div>
`;