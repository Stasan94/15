<template>
	<div class="header">
		<h1>15</h1>
		<div class="counter">Ходов<span>{{ this.$store.getters.counter }}</span></div>
		<div class="timer">Время
			<span>{{ this.zeroOnTimer(this.$store.getters.minutes) }}:{{ this.zeroOnTimer(this.$store.getters.seconds) }}
			</span>
		</div>
	</div>
</template>

<script>
import {store} from '@/store/index.js';

	export default{
		methods: {
			zeroOnTimer: function(time){
				if(time < 10){
					time = '0' + time;
				}
				return time;
			}
		}
	}
</script>

<style scoped lang="scss">
	%header-blocks{
		width: 90px;
		height: 60px;
		background: #A89FB8;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 17px;
		font-weight:600;
		color: #DCD4EA;
		span{
			color: #fff;
		}
	}
	.header{
		width: 450px;
		height: 100px; 
		display: flex;
		justify-content: space-around;
		align-items: center;
		h1{
			font-size: 72px;
			color: #6C6575;
		}
		.counter{
			@extend %header-blocks
		}
		.timer{
			@extend %header-blocks
		}
	}
</style>