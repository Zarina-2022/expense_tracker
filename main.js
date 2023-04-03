const inputExpense = document.getElementById('expense');
const inputPrice = document.getElementById('price');
const addBtn = document.querySelector('.add-btn');
const paidState = document.querySelector('#state');
const expenseList = document.querySelector('#expense-list');
const totalPrice = document.querySelector('#total-price');
const inputName = document.getElementById('input-name');
const inputSelect = document.querySelector('select');

// Toplam fiyatin state'i
let total = 0;

// toplam fiyat kismini guncelleme fonksiyonu:

function updatePrice(e) {
  total += Number(e);
  totalPrice.innerText = total;
}

function addExpense(e) {
  e.preventDefault();
  // Validation
  if (!inputExpense.value && !inputPrice.value) return;
  // eklenemek olan listenin table'ni hazirlayalim:
  const expenseDiv = document.createElement('div');
  // olusturdugumuz div'e class ekledik:
  expenseDiv.classList.add('expenditure');

  // Eger edendiyse yeni class verelim (e.g price = green olsun):
  if (paidState.checked) {
    expenseDiv.classList.add('paid');
  }

  // icerigi belirlemek:
  expenseDiv.innerHTML = `
  <h2 class="expense-title">${inputExpense.value}</h2>
  <h2 class="expense-price">${inputPrice.value}</span></h2>
  <div class="expense-buttons">
      <i id="payment" class="fa-solid fa-credit-card fa-flip fa-lg" style="color: #2254aa;"></i>
      <i id="delete" class="fa-solid fa-trash fa-flip fa-lg" style="color: #cc1e27;"></i>
  </div>
  `;
  // olusan innerHTML'li html'e (ordaki div'e ) gonderelim:
  expenseList.appendChild(expenseDiv);

  // toplam fiyati guncellemek:
  updatePrice(inputPrice.value);
  // inputlari add yapildiktan sonra sifirlamak icin:
  inputExpense.value = '';
  inputPrice.value = '';
  paidState.checked = false; // checked sifirlaniyor add'e basildiktan sonra
}
addBtn.addEventListener('click', addExpense);
 
//-----------------------------------------------------------------------
// Silme islemi ve Payment (eger odenmemis ise classini degistir) islemi (handleClick'i burada tanimayalim)
function handleClick(e) {
  // tiklanilan eleman
  const item = e.target;

  // eger tiklananin id'si remove ise sil fonksiyonu:
  if (item.id === 'delete') {
    const headElement = item.parentElement.parentElement;

    // silinecek item'e animasyon ekleme:
    headElement.classList.add('fall');

    // animasyon (transition end) bittiginde fonksiyon calisacak:
    headElement.addEventListener('transitionend', () => {
      headElement.remove();
    });

    // total price'tan delete olan item'in price'ini cikarmak:
    const deletedElement = Number(
      headElement.querySelector('.expense-price').innerText
    );
    total -= deletedElement;
    totalPrice.innerText = total;
  }

  //-----------------------------------------------------------------------
  // eger tiklananin id'si payment ise odendi/odenmedi class'i degistirme fonksiyonu calisacak:
  if (item.id === 'payment') {
    const headElement = item.parentElement.parentElement;
    headElement.classList.toggle('paid');
  }
}
expenseList.addEventListener('click', handleClick);

// kullanici adi local store kaydetme:
inputName.addEventListener('change', (e) => {
  localStorage.setItem('username', e.target.value);
});

const username = localStorage.getItem('username');
inputName.value = username;

// Select alani:

function handleSelect(e) {
  const items = expenseList.childNodes;
  console.log(items);
  items.forEach((item) => {
    console.log('asdasd', item);
    switch (e.target.value) {
      case 'everythingIsPaid':
        item.style.display = 'flex';
        break;

      case 'alreadyPaid':
        if (item.classList.contains('paid')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;

      case 'notPaidYet':
        if (!item.classList.contains('paid')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;
    }
  });
}
inputSelect.addEventListener('change', handleSelect);
