"use strict";

// Menu hamburger: navigasi tetap tersedia tanpa JavaScript pada layar desktop.
const menuButton = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".nav-list");

if (menuButton && menuList) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuList.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  });

  menuList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuList.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Buka menu navigasi");
    });
  });
}

// Mengisi tahun footer secara otomatis.
document.querySelectorAll(".current-year").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

// Katalog menggunakan array objek agar pencarian dan filter dapat dilakukan dinamis.
// HTML juga menyediakan 12 kartu awal sebagai fallback bila JavaScript dimatikan.
const catalogGrid = document.querySelector("#catalog-grid");
const searchInput = document.querySelector("#catalog-search");
const categoryFilter = document.querySelector("#category-filter");
const catalogCount = document.querySelector("#catalog-count");
const noResults = document.querySelector("#no-results");

if (catalogGrid && searchInput && categoryFilter && catalogCount && noResults) {
  const catalogItems = [
    { image: "produk-01.jpg", alt: "Cake persegi dengan hiasan buah, cokelat, dan tulisan dekoratif", category: "cake-buah", categoryLabel: "Cake buah", name: "Fruit Celebration Cake", description: "Cake dekorasi buah dengan pilihan hiasan yang terlihat pada foto postingan.", keywords: "fruit celebration cake buah stroberi cokelat" },
    { image: "produk-02.jpg", alt: "Cake memanjang dengan topping stroberi dan cokelat", category: "cake-buah", categoryLabel: "Cake buah", name: "Fruit & Chocolate Cake", description: "Cake memanjang dengan dekorasi buah dan cokelat pada bagian atas.", keywords: "cake buah cokelat stroberi" },
    { image: "produk-03.jpg", alt: "Cake bulat berwarna merah muda dengan taburan remah merah", category: "cake-custom", categoryLabel: "Cake custom", name: "Pink Celebration Cake", description: "Cake bulat dengan tampilan warna merah muda dan taburan pada permukaan.", keywords: "pink cake cake custom warna pink" },
    { image: "produk-04.jpg", alt: "Potongan dessert cokelat tersusun di dalam kotak", category: "dessert", categoryLabel: "Dessert & potongan", name: "Chocolate Dessert Box", description: "Potongan dessert bernuansa cokelat yang dikemas dalam kotak.", keywords: "chocolate dessert potongan cokelat brownies" },
    { image: "produk-05.jpg", alt: "Cake bundar dengan aneka buah dan tulisan ucapan", category: "cake-buah", categoryLabel: "Cake buah", name: "Fruit Topping Cake", description: "Contoh cake dengan topping aneka buah dan tulisan ucapan.", keywords: "fruit topping cake cake buah custom" },
    { image: "produk-06.jpg", alt: "Cake dengan topping stroberi merah dan pita merah", category: "cake-buah", categoryLabel: "Cake buah", name: "Strawberry Celebration Cake", description: "Cake dengan topping stroberi merah dan dekorasi pita pada kemasan.", keywords: "strawberry cake cake stroberi" },
    { image: "produk-07.jpg", alt: "Potongan cake berwarna keemasan dalam kotak kecil", category: "dessert", categoryLabel: "Dessert & potongan", name: "Golden Cake Slice", description: "Potongan cake berwarna keemasan yang dikemas satuan.", keywords: "cake slice potongan cake box" },
    { image: "produk-08.jpg", alt: "Cake panggang berbentuk bulat dengan permukaan keemasan", category: "dessert", categoryLabel: "Dessert & potongan", name: "Golden Baked Cake", description: "Cake panggang berbentuk bulat dengan permukaan keemasan.", keywords: "baked cake pie cake panggang" },
    { image: "produk-09.jpg", alt: "Deretan dessert cokelat dalam wadah kecil", category: "dessert", categoryLabel: "Dessert & potongan", name: "Chocolate Dessert Cups", description: "Deretan dessert cokelat dalam wadah kecil untuk sajian praktis.", keywords: "dessert cup cokelat dessert box" },
    { image: "produk-10.jpg", alt: "Cake bundar dengan topping stroberi dan hiasan krim", category: "cake-buah", categoryLabel: "Cake buah", name: "Strawberry Cream Cake", description: "Cake bundar dengan topping stroberi dan hiasan krim pada sisi atas.", keywords: "strawberry cream cake buah stroberi" },
    { image: "produk-11.jpg", alt: "Cake dekorasi dengan aneka buah dan cokelat", category: "cake-custom", categoryLabel: "Cake custom", name: "Custom Fruit Cake", description: "Contoh dekorasi cake dengan buah dan cokelat untuk pesanan khusus.", keywords: "custom fruit cake cake buah dekorasi" },
    { image: "produk-12.jpg", alt: "Potongan cake berlapis dengan permukaan keemasan", category: "dessert", categoryLabel: "Dessert & potongan", name: "Layered Cake Slice", description: "Potongan cake berlapis yang disajikan dalam kemasan satuan.", keywords: "cheesecake slice cake potongan keju" }
  ];

  const makeCard = (item) => `
    <article class="product-card">
      <a class="product-image" href="kontak.html" aria-label="Tanyakan ${item.name}">
        <img src="img/${item.image}" alt="${item.alt}" loading="lazy">
      </a>
      <div class="product-info">
        <span class="product-category">${item.categoryLabel}</span>
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <div class="product-bottom"><strong>Harga via admin</strong><a href="kontak.html">Tanya <span aria-hidden="true">→</span></a></div>
      </div>
    </article>`;

  const renderCatalog = () => {
    const query = searchInput.value.trim().toLocaleLowerCase("id");
    const selectedCategory = categoryFilter.value;
    const filteredItems = catalogItems.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const searchableText = `${item.name} ${item.description} ${item.keywords}`.toLocaleLowerCase("id");
      return matchesCategory && searchableText.includes(query);
    });

    catalogGrid.innerHTML = filteredItems.map(makeCard).join("");
    catalogCount.textContent = `Menampilkan ${filteredItems.length} dari ${catalogItems.length} contoh produk`;
    noResults.hidden = filteredItems.length !== 0;
  };

  searchInput.addEventListener("input", renderCatalog);
  categoryFilter.addEventListener("change", renderCatalog);
  renderCatalog();
}

// Validasi tambahan: pesan kesalahan ditampilkan di bawah setiap kolom.
// Data tidak dikirim ke server; setelah valid, halaman membuat tautan WhatsApp.
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const fields = Array.from(contactForm.querySelectorAll("input[required], select[required], textarea[required]"));
  const statusMessage = document.querySelector("#form-status");
  const whatsappNumber = "6282280342920";

  const getErrorMessage = (field) => {
    if (field.validity.valueMissing) return "Kolom ini wajib diisi.";
    if (field.validity.typeMismatch && field.type === "email") return "Masukkan alamat email dengan format yang benar.";
    if (field.validity.patternMismatch) return "Nomor HP harus terdiri dari 10–13 digit angka.";
    if (field.validity.tooShort) return `Masukkan minimal ${field.minLength} karakter.`;
    if (field.validity.tooLong) return `Maksimal ${field.maxLength} karakter.`;
    return "Periksa kembali isian ini.";
  };

  const updateFieldMessage = (field) => {
    const errorElement = document.querySelector(`#${field.id}-error`);
    if (!errorElement) return field.checkValidity();

    if (field.checkValidity()) {
      errorElement.textContent = "";
      field.removeAttribute("aria-invalid");
      return true;
    }

    errorElement.textContent = getErrorMessage(field);
    field.setAttribute("aria-invalid", "true");
    return false;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => updateFieldMessage(field));
    field.addEventListener("change", () => updateFieldMessage(field));
    field.addEventListener("invalid", () => updateFieldMessage(field));
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const allValid = fields.map(updateFieldMessage).every(Boolean);

    if (!allValid || !contactForm.checkValidity()) {
      const firstInvalid = fields.find((field) => !field.checkValidity());
      if (firstInvalid) firstInvalid.focus();
      statusMessage.textContent = "Masih ada kolom yang perlu diperbaiki.";
      return;
    }

    const formData = new FormData(contactForm);
    const message = [
      "Halo Icha Kitchen, saya ingin bertanya.",
      `Nama: ${formData.get("nama")}`,
      `Email: ${formData.get("email")}`,
      `Nomor HP: ${formData.get("telepon")}`,
      `Keperluan: ${formData.get("pilihan")}`,
      `Pesan: ${formData.get("pesan")}`
    ].join("\n");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    statusMessage.textContent = "Data sudah lolos pemeriksaan. Klik tautan berikut untuk membuka WhatsApp dan mengirim pesan Anda.";
    const sendLink = document.createElement("a");
    sendLink.href = whatsappUrl;
    sendLink.target = "_blank";
    sendLink.rel = "noopener noreferrer";
    sendLink.textContent = "Lanjutkan ke WhatsApp";
    statusMessage.appendChild(document.createElement("br"));
    statusMessage.appendChild(sendLink);
  });
}
