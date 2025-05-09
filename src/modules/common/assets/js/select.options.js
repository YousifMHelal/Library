const loadBookCategorySelectOptions = (select, params, choosenValue, choosenId) => {
    return axios.get('/api/categories', { params }).then((response) => {
        const options = response.data.data
        let selectedIndex = 0
        select.innerHTML = options.reduce((previous, option, index) => {
            if (choosenValue === option.name || choosenId === option.id) {
                selectedIndex = index
            }
            return `${previous}\n<option value='${option.id}' class="selectOpt bg-dark">${option.name}</option>`
        }, '')
        select.selectedIndex = selectedIndex
    })
}

const loadBookShelfsSelectOptions = (select, params, choosenValue, choosenId) => {
    return axios.get('/api/shelfs', { params }).then((response) => {
        const options = response.data.data
        let selectedIndex = 0
        select.innerHTML = options.reduce((previous, option, index) => {
            if (choosenValue === option.name || choosenId === option.id) {
                selectedIndex = index
            }
            return `${previous}\n<option value='${option.id}' class="selectOpt bg-dark">${option.name}</option>`
        }, '')
        select.selectedIndex = selectedIndex
    })
}

const loadBookStandsSelectOptions = (select, params, choosenValue, choosenId) => {
    return axios.get('/api/stands', { params }).then((response) => {
        const options = response.data.data
        let selectedIndex = 0
        select.innerHTML = options.reduce((previous, option, index) => {
            if (choosenValue === option.name || choosenId === option.id) {
                selectedIndex = index
            }
            return `${previous}\n<option value='${option.id}' class="selectOpt bg-dark">${option.name}</option>`
        }, '')
        select.selectedIndex = selectedIndex
    })
}