<template>
	<div class="wrap">
		<div class="field">
		<div v-on:click="playerStep($event, index)" v-for="(cell, index) of field" class="cell">{{ cell }}</div>
	</div>
	<button v-on:click="shuffleField" class="btn">Перемешать</button>
	</div>
</template>

<script>

import Vue from 'vue';
import {store} from '@/store/index.js';

	export default{
		data: function(){
			return {
				field: [
				'1', '2', '3' ,'4',
				'5', '6', '7', '8',
				'9', '10', '11', '12',
				'13', '14', '15', ''],
				isEmpty: false,
				counter: 0,
				seconds: 0,
				minutes: 0,
				timer: null
			}
		},
		created: function(){
			this.shuffleField();
		},
		methods: {
			shuffleField: function(){
				// Перемешивание игрового поля
				let newField = [
				'1', '2', '3' ,'4',
				'5', '6', '7', '8',
				'9', '10', '11', '12',
				'13', '14', '15', ''];
				for (let i = newField.length - 1; i > 0; i--) {
    				let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    				let t = newField[i];
    				newField[i] = newField[j];
    				newField[j] = t;
  				}
  				this.field = newField;
  				this.seconds = 0;
				this.minutes = 0;
				this.counter = 0;
				this.$store.dispatch('setSeconds', this.seconds);
				this.$store.dispatch('setMinutes', this.minutes);
				this.$store.dispatch('setCounter', this.counter);
				if(this.timer){
				clearInterval(this.timer);
				this.timer = null;
				this.removeEmptyClass();
				}
			},
			playerStep: function(event, index){
				// Обработка хода игрока
				let selectedItem = event.target.innerHTML;
				for(let i=0; i<this.field.length; i++){
					if(this.field[i] == ''){
						if(selectedItem == this.field[i-1] || selectedItem == this.field[i+1] ||
						   selectedItem == this.field[i-4] || selectedItem == this.field[i+4]){
 							Vue.set(this.field, i, selectedItem);
							Vue.set(this.field, index, '');
							this.removeEmptyClass();
							event.target.classList.add('empty');
						}
					}
				}
				this.counter++;
				this.$store.dispatch('setCounter', this.counter);
				if(this.timer == null){
					this.timer = setInterval(this.startTimer, 1000);
				}
				this.isWin();
			},
			startTimer: function(){
				//Запуск таймера
				this.seconds++;
				if(this.seconds == 60){
					this.minutes++;
					this.seconds = 0;
					this.$store.dispatch('setMinutes', this.minutes);
				}
				this.$store.dispatch('setSeconds', this.seconds);
			},
			isWin: function(){
				//Проверка на победу
				let win = 0;
				let winCombination = [
				'1', '2', '3' ,'4',
				'5', '6', '7', '8',
				'9', '10', '11', '12',
				'13', '14', '15', ''];
				for(let i=0; i<this.field.length; i++){
					if(this.field[i] == winCombination[i]){
						win++;
					}
				}
				if(win == 16){
					clearInterval(this.timer);
					this.timer = null;
					this.removeEmptyClass();
					alert('You win!');
				}
			},
			removeEmptyClass: function(){
				//Удаление css класса empty у всех игровых ячеек
				let cells = document.querySelectorAll('.cell');
				for(let elem of cells){
					elem.classList.remove('empty');
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	$corners: 10px;
	.wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		.field{
			width: 450px;
			height: 450px;
			display: flex;
			flex-wrap: wrap;
			background: #A89FB8;
			border-radius: $corners;
			padding: 10px;
			box-sizing: border-box;
			.cell{
				width: 100px;
				height: 100px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #D6CCE4;
				border-radius: $corners;
				margin: auto;
				font-size: 40px;
				color: #6C6575;
				font-weight: bold;
				cursor: pointer;
			}
			.empty{
				opacity: 0;
				transition: .4s;
			}
		}
		.btn{
			height: 40px;
			width: 200px;
			border: none;
			font-size: 26px;
			color: #6C6575;
			background: #D6CCE4;
			border-radius: 5px;
			cursor: pointer;
			margin: 10px;
		}
	}
</style>