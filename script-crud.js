const bntAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')

bntAdicionarTarefa.addEventListener('click', () =>{
    formAdicionarTarefa.classList.toggle('hidden')
})