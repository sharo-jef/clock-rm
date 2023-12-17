<script lang="ts">
	import { browser } from "$app/environment";

  function pad(num: number) {
    return `${num}`.padStart(2, '0');
  }

  export let day = false;
  export let hour = false;
  export let minutes = false;
  export let seconds = false;
  export let speed = false;

  let value = '';

  if (browser) {
    setInterval(async () => {
      const data = await fetch('/api/clock')
        .then(res => res.json())
        .catch(error => console.error(error));
      console.log(data);
      const currentTime = typeof data?.pausedAt === 'number' && data.pausedAt === -1 ? Date.now() : new Date(data.pausedAt).getTime();
      const time = new Date((currentTime - data.startedAt) % 86400000);
      const currentDay = Math.floor((Date.now() - data.startedAt) / 86400000);
      const tempArray = [];
      if (day) {
        tempArray.push(currentDay);
      }
      if (hour) {
        tempArray.push(time.getUTCHours());
      }
      if (minutes) {
        tempArray.push(time.getUTCMinutes());
      }
      if (seconds) {
        tempArray.push(time.getUTCSeconds());
      }
      value = tempArray.map(pad).join(':');
      if (speed) {
        value += ` (${data.speed}x)`;
      }
    }, 1000);
  }
</script>

{value}
