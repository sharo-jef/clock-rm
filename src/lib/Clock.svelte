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
      const data = await fetch('/api/clock').then(res => res.json()).catch(error => console.error(error));
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
    }, 1000);
  }
</script>

{value}
