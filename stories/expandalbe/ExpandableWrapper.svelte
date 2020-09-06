<script>
  import TestPreview from './TestPreview.svelte';
  import FullScreenComponent from './FullScreenComponent.svelte';
  import ExpandableSlots from '../../src/components/Expandable/ExpandableSlots.svelte';
</script>

<div class="mt-10 ml-5">
  <ExpandableSlots
    let:isFullVisible
    let:showFullScreenComponent
    let:hideFullScreenComponent>
    <div slot="preview">
      <TestPreview {showFullScreenComponent} />
    </div>
    <div slot="fullScreenComponent" class="h-full">
      <FullScreenComponent {isFullVisible} {hideFullScreenComponent} />
    </div>
  </ExpandableSlots>
</div>

<div class="mt-32 ml-32">
  <ExpandableSlots
    let:isFullVisible
    let:showFullScreenComponent
    let:hideFullScreenComponent>
    <div slot="preview">
      <TestPreview {showFullScreenComponent} />
    </div>
    <div slot="fullScreenComponent" class="h-full">
      <FullScreenComponent {isFullVisible} {hideFullScreenComponent} />
    </div>
  </ExpandableSlots>
</div>

<div class="mt-32 flex justify-end mr-5">
  <ExpandableSlots
    let:isFullVisible
    let:showFullScreenComponent
    let:hideFullScreenComponent>
    <div slot="preview">
      <TestPreview {showFullScreenComponent} />
    </div>
    <div slot="fullScreenComponent" class="h-full">
      <FullScreenComponent {isFullVisible} {hideFullScreenComponent} />
    </div>
  </ExpandableSlots>
</div>

<div class="mt-32 flex justify-end mr-5">
  <ExpandableSlots
    let:isFullVisible
    let:showFullScreenComponent
    let:hideFullScreenComponent>
    <div slot="preview">
      <TestPreview {showFullScreenComponent} />
    </div>
    <div slot="fullScreenComponent" class="h-full">
      <FullScreenComponent {isFullVisible} {hideFullScreenComponent} />
    </div>
  </ExpandableSlots>
</div>
