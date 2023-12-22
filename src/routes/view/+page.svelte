<script lang="ts">
	import { onMount } from "svelte";

  let time = '00:00';
  onMount(async () => {
    setInterval(async () => {
      const data = await fetch('/api/clock').then(res => res.json()).catch(error => console.error(error));
      time = data.timeAsTextWithoutDay.slice(0, -3);
    }, 1000);
  });
</script>

<h1>
  {time}
</h1>
