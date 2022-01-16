//function for displaying result count
const resultCountOptions = option => {
    const searchTotal = document.getElementById('search-total');
    searchTotal.style.display = option;
}
//function for spinner
const toggleSpinner = (newClass, previousClass) => {
    const spinner = document.getElementById('spinner');
    const spinnerText = document.getElementById('spinner-text');
    spinner.classList.add(newClass);
    spinner.classList.remove(previousClass);
    spinnerText.classList.add(newClass);
    spinnerText.classList.remove(previousClass);

}
//global variable for search text
let searchValue = '';
//function to get desire book data
const searchBook = () => {
    const searchField = document.getElementById('search-text');
    searchValue = searchField.value;

    const h5 = document.createElement('h5');
    const parentContainer = document.getElementById('search-result');
    parentContainer.textContent = '';
    //condition for no entry error 
    if (searchValue == '') {
        resultCountOptions('none');
        h5.classList.add('whitetext');
        h5.innerText = "Please enter something to see result";
        parentContainer.appendChild(h5);

    }

    else {
        const url = `https://openlibrary.org/search.json?q=${searchValue}`
        toggleSpinner('d-block', 'd-none');
        resultCountOptions('none');
        // console.log(url)
        fetch(url)
            .then(resp => resp.json())
            .then(data => displaySearch(data.docs, data.numFound));
    }

    searchField.value = '';
}
//function to display matched book data
const displaySearch = (data, numFound) => {
    // console.log(data);
    let matchedData = [];
    data.map(x => {
        if (x.title.toLowerCase().indexOf(searchValue) != -1) {
            matchedData.push(x);
        }
    })
    toggleSpinner('d-none', 'd-block');

    const parentContainer = document.getElementById('search-result');


    const h5 = document.createElement('h5');
    //conditions if no book found of desire keyword
    if (data.length === 0) {
        h5.classList.add('whitetext');
        h5.innerText = "No book found"
        parentContainer.appendChild(h5);
    }

    else {
        // console.log(data)
        h5.innerText = '';
        const searchTotal = document.getElementById('search-total');
        searchTotal.innerText = `Total Hits Count: ${numFound}`;
        resultCountOptions('block');
        matchedData.forEach(book => {

            // console.log(book);
            // console.log(book.author_name);
            // console.log(book.title);
            // console.log(book.publisher);
            // // console.log(book.first_publish_year);
            // console.log(book.cover_i);
            const coverID = book.cover_i ? book.cover_i : '';
            let imgUrl = '';
            if (coverID !== '') {
                imgUrl = `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
            }
            else {
                imgUrl = "NoImagePriview.png"
            }
            const div = document.createElement('div');

            div.classList.add('col', 'whitetext');
            div.innerHTML = `

                <divclass="card">
                            <img width="150px" src=${imgUrl} alt="...">
                            <div  class="card-body searchItem">
                                <h5 class="card-title">Titel: ${book.title}</h5>
                                <p class="card-text">Author: ${book.author_name ? book.author_name[0] : 'No Info Available'}</p>
                                <p class="card-text">Publisher: ${book.publisher ? book.publisher[0] : 'No Info Available'}</p>
                                <p class="card-text">First Publish: ${book.first_publish_year}</p>

                            </div>
                </div>
            `
            parentContainer.appendChild(div);
        })

    }

}