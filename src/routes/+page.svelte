<script lang="ts">
  import { io } from 'socket.io-client';

  import Clock from '$lib/Clock.svelte';

  const socket = io();

  const start = () => socket.emit('start');
  const stop = () => socket.emit('stop');

  let day = 1;
  let hour = 0;
  let minutes = 0;
  let seconds = 0;
  const setTime = () => {
    socket.emit('setTime', { day, hour, minutes, seconds });
  }

  let speed = 1;
  let remoteSpeed = 1;
  const setSpeed = () => {
    socket.emit('setSpeed', speed);
  };
  socket.on('syncSpeed', remoteSpeedTmp => {
    remoteSpeed = remoteSpeedTmp;
  });
</script>

<h1>
  <Clock day hour minutes seconds />
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
