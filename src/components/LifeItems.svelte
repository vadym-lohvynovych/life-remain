<script>
  import Expandable from './Expandable/Expandable.svelte';
  import ExpandableSlots from './Expandable/ExpandableSlots.svelte';
  import CellsWrapper from './CellsWrapper.svelte';

  import { birthDate } from '../stores/birthDate';
  import { getLifeCount } from '../helpers/calculations';
  import Preview from './Preview.svelte';

  export let name = '';
  export let widthClass = '';
  $: liveCount = getLifeCount(new Date($birthDate));
</script>

<ExpandableSlots
  let:isFullVisible
  let:showFullScreenComponent
  let:hideFullScreenComponent>
  <div slot="preview">
    <Preview {showFullScreenComponent} lifeItems={liveCount[name]} {name} />
  </div>
  {isFullVisible}
  <div slot="fullScreenComponent" class="h-full">
    <CellsWrapper
      {name}
      {isFullVisible}
      {widthClass}
      {hideFullScreenComponent}
      lifeItems={liveCount[name]} />
  </div>
</ExpandableSlots>
