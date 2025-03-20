const { jsPDF } = window.jspdf;

document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.querySelector(".addbtn");
  const lefty = document.querySelector(".lefty");
  const totalInput = document.querySelector("ul li:last-child input");
  const subTotalInput = document.querySelector("ul li:first-child input");
  const discountInput = document.querySelector("ul li:nth-child(2) input");
  const taxInput = document.querySelector("ul li:nth-child(3) input");
  const shippingInput = document.querySelector("ul li:nth-child(4) input");
  const previewBtn = document.querySelector(".btnpreview");
  const createBtn = document.querySelector(".btncreate");

  function updateTotal() {
    let subTotal = 0;
    document.querySelectorAll(".list").forEach((item) => {
      const price = parseFloat(item.querySelector(".price").value) || 0;
      const quantity = parseInt(item.querySelector(".quantity").value) || 0;
      subTotal += price * quantity;
    });

    subTotalInput.value = subTotal.toFixed(2);
    let discount = parseFloat(discountInput.value) || 0;
    let tax = parseFloat(taxInput.value) || 0;
    let shipping = parseFloat(shippingInput.value) || 0;

    let total = subTotal - discount + tax + shipping;
    totalInput.value = total.toFixed(2);
  }

  addBtn.addEventListener("click", function () {
    const newItem = document.createElement("div");
    newItem.classList.add("list");
    newItem.innerHTML = `
        <input type="text" placeholder="Item" class="items" />
        <input type="tel" placeholder="Price" class="price" />
        <input type="number" placeholder="Quantity" class="quantity" />
        <button class="removee">Remove</button>
      `;
    lefty.insertBefore(newItem, addBtn);

    newItem.querySelector(".removee").addEventListener("click", function () {
      newItem.remove();
      updateTotal();
    });

    newItem.querySelector(".price").addEventListener("input", updateTotal);
    newItem.querySelector(".quantity").addEventListener("input", updateTotal);
  });

  document.querySelectorAll(".removee").forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.parentElement.remove();
      updateTotal();
    });
  });

  document
    .querySelectorAll(".price, .quantity, ul li input")
    .forEach((input) => {
      input.addEventListener("input", updateTotal);
    });

  previewBtn.addEventListener("click", function () {
    document.querySelector(".invoice-preview").classList.toggle("show");
  });

  createBtn.addEventListener("click", function () {
    const doc = new jsPDF();
    doc.text("Invoice", 20, 20);
    doc.text(`Total: ${totalInput.value}`, 20, 40);
    doc.save("invoice.pdf");
  });

  updateTotal();
});
