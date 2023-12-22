<script lang="ts">
	import { browser } from '$app/environment';

  let time = '0000:00:00:00';

  const start = () => fetch('/api/clock/start', { method: 'POST' });
  const stop = () => fetch('/api/clock/stop', { method: 'POST' });

  let day = 1;
  let hour = 0;
  let minutes = 0;
  let seconds = 0;
  const setTime = () => {
    fetch('/api/clock/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        time: (day - 1) * 24 * 60 * 60 + hour * 60 * 60 + minutes * 60 + seconds,
      }),
    });
  }

  let speed = 1;
  let remoteSpeed = 1;
  const setSpeed = () => {
    fetch('/api/clock/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ speed }),
    });
  };
  if (browser) {
    setInterval(async () => {
      const data = await fetch('/api/clock').then(res => res.json()).catch(error => console.error(error));
      time = data.timeAsText;
      remoteSpeed = data.speed;
    }, 1000);
  }
</script>

<h1>
  {time}
</h1>

Speed: {remoteSpeed}

<hr />

<input type=button on:click={start} value=start />
<input type=button on:click={stop} value=stop />
<hr />
<input type=number bind:value={day} min=1/> :
<input type=number bind:value={hour} min=0 max=23/> :
<input type=number bind:value={minutes} min=0 max=59 /> :
<input type=number bind:value={seconds} min=0 max=59 />
<input type=button on:click={setTime} value=set />
<hr />
<label for=speed>Speed:</label>
<input id=speed type=number bind:value={speed} min=1 max=6 />
<input type=button on:click={setSpeed} value=set />
