<template>
    <div class="preloader">
        <svg viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="big-circle" d="M101 51C101 78.6142 78.6142 101 51 101C23.3858 101 1 78.6142 1 51" stroke="#252525"
                stroke-width="2" />
            <path class="small-circle" d="M91 51C91 28.9086 73.0914 11 51 11C28.9086 11 11 28.9086 11 51" stroke="#252525"
                stroke-width="2" />
        </svg>
    </div>
</template>

<style scoped>
body {
    background-color: #dddddd;
}

svg {
    width: 100%;
    height: 100%;

}

* {
    box-sizing: border-box;
}

.preloader {
    position: absolute;
    width: 102px;
    height: 102px;
    left: 50%;
    top: 50%;
    min-height: 102px;
    transform: translateX(-50%) translateY(-50%);
}

.preloader .small-circle {
    stroke-dasharray: 210;
    stroke-dashoffset: 210;
    transform-origin: 50%;
    animation: 1s draw-small infinite alternate;
}

@keyframes draw-small {
    0% {
        stroke-dashoffset: 0;
        transform: rotate(0deg);
    }

    100% {
        stroke-dashoffset: 210;
        transform: rotate(360deg);
    }
}

.preloader .big-circle {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    transform-origin: 50%;
    animation: 1s draw-big infinite alternate 0.5s;
}

@keyframes draw-big {
    0% {
        stroke-dashoffset: 0;
        transform: rotateY(180deg) rotate(360deg);
    }

    100% {
        stroke-dashoffset: 240;
        transform: rotateY(180deg) rotate(0deg);
    }
}
</style>