<script lang="ts">
  import { io } from 'socket.io-client';

  function pad(num: number) {
    return `${num}`.padStart(2, '0');
  }

  export let day = false;
  export let hour = false;
  export let minutes = false;
  export let seconds = false;
  export let speed = false;

  const socket = io();

  let value = '';

  socket.on('sync', (data) => {
    const valueArray = [];
    if (day) {
      valueArray.push(`${data.day}`);
    }
    if (hour) {
      valueArray.push(`${pad(data.hour)}`);
    }
    if (minutes) {
      valueArray.push(`${pad(data.minutes)}`);
    }
    if (seconds) {
      valueArray.push(`${pad(data.seconds)}`);
    }
    value = valueArray.join(':');
  });
</script>

{value}
