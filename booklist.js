class Book{
constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}
}
const book1=new Book("Book1","Shakespeare","1234")
//console.log(book1)

class UI{

static displayBook(){
    const storedBooks= [new Book('Book1','John Doe','1234'), new Book('Book2','John','12345')]
    storedBooks.forEach(function(kitab,idx){
        //console.log(idx)
        UI.addBookToList(kitab)
    })
}

 static addBookToList(book){
    const list=document.querySelector("#book-list")
    const row=document.createElement("tr")
    row.innerHTML=`<td>${book.title}</td>
                   <td>${book.author}</td>
                   <td>${book.isbn}</td>
                   <td><a href="#" class="btn btn-danger float right delete">X</a></td>`
    //console.log(row)
    list.appendChild(row)
    }
static clearAllFields(){
    document.querySelector("#title").value=""
    document.querySelector("#author").value=""
    document.querySelector("#isbn").value=""
}
static showAlert(className,msg){
    const div=document.createElement("div")
    div.className="alert alert-"+className
    //console.log(div)
    div.appendChild(document.createTextNode(msg))
    //console.log(div)
    const container=document.querySelector(".container")
    const form=document.querySelector("#book-form")
    container.insertBefore(div,form)
    setTimeout(function(){
        document.querySelector(".alert").remove()
    },3000)
}
static deleteBook(x){
    if(x.target.classList.contains("delete")){
        if( confirm("Are you sure you want to delete this Book?")){
         console.log(x.target.parentElement.parentElement.remove())
        }
     }
}
}

class Store{
    static addBook(book){
        const books=Store.getBooks()
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books))
    }
    static getBooks(){
        let books
        if(localStorage.getItem("books")==null){
        books=[]
    } else{
        books=JSON.parse(localStorage.getItem("books"))
    }
    return books;
}
static removeBook(isbn){
const books=Store.getBooks()
//console.log(books)
 books.forEach(function(kitab,idx) {
    if(kitab.isbn==isbn)
        books.splice(idx,1)
})
//console.log(books)
localStorage.setItem("books",JSON.stringify(books))
}
}

document.querySelector("#book-form").addEventListener("submit",function(e){
e.preventDefault()
const title=document.querySelector("#title").value 
const author=document.querySelector("#author").value
const isbn=document.querySelector("#isbn").value
if(title==''|| author==''|| isbn==''){
    UI.showAlert("danger","Please Enter all the values")
}else{
const book=new Book(title,author,isbn)
UI.addBookToList(book)
Store.addBook(book)
UI.clearAllFields()
UI.showAlert("success","Book Added Successfully")}
})

document.querySelector("#book-list").addEventListener("click",function(x){
    UI.deleteBook(x)
    Store.removeBook(x.target.parentElement.previousElementSibling.innerHTML)

    UI.showAlert("success","Book deleted successfully")    
//console.log(x.target.parentElement.previousElementSibling.innerHTML)
    })

window.addEventListener("DOMContentLoaded",UI.displayBook)