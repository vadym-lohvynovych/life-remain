<script>
  import Expandable from '../../components/Expandable.svelte';
  import TestPreview from './TestPreview.svelte';
  import FullScreenComponent from './FullScreenComponent.svelte';
</script>

<div class="mt-10 ml-5">
  <Expandable preview={TestPreview} fullScreenComponent={FullScreenComponent} />
</div>

<div class="mt-32 ml-32">
  <Expandable preview={TestPreview} fullScreenComponent={FullScreenComponent} />
</div>

<div class="mt-32 flex justify-end mr-5">
  <Expandable preview={TestPreview} fullScreenComponent={FullScreenComponent} />
</div>

<div class="mt-32 flex justify-end mr-5">
  <Expandable preview={TestPreview} fullScreenComponent={FullScreenComponent} />
</div>
