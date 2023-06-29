<script>
export default {
  data() {
    return {
        description: "Test",
        title: "Test",
    }
  }
}
</script>

<template>
    <div class="recipe_panel">
        <div class="panel__image"></div>
        <div class="panel__text">
            <div class="recipe__title text-center">{{ title }}</div>
            <div class="recipe__description">{{ title }}</div>
        </div>
    </div>
</template>

<style>
.recipe_panel {
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
}

</style>