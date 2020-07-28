<template>
    <div>
        <jsonLd-viewer :jsonld="sell_data"/>
    </div>
</template>
<script>
export default {
    name: 'DemoViewer',
    data() {
        const sell_data = JSON.parse(localStorage.getItem('sell_data'))
        return {
            sell_data
        }
    }
}
</script>