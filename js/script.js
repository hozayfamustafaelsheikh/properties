
const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    type: "Villa",
    location: "Palm Jumeirah, Dubai",
    price: 4500000,
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
    description: "A beautiful luxury villa with spacious living areas, elegant interiors, a private garden, and premium finishes."
  },
  {
    id: 2,
    title: "Contemporary Apartment",
    type: "Apartment",
    location: "Downtown Dubai",
    price: 1800000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    description: "A stylish apartment in a prime location with modern interiors, natural light, and excellent amenities."
  },
  {
    id: 3,
    title: "Elegant Family House",
    type: "House",
    location: "Al Reem Island, Abu Dhabi",
    price: 2300000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=80",
    description: "A comfortable family home featuring generous rooms, a functional layout, and convenient access to local services."
  },
  {
    id: 4,
    title: "Premium City Apartment",
    type: "Apartment",
    location: "Business Bay, Dubai",
    price: 1200000,
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    description: "A bright city apartment with an open-plan living area and easy access to business and leisure destinations."
  },
  {
    id: 5,
    title: "Private Garden Villa",
    type: "Villa",
    location: "Yas Island, Abu Dhabi",
    price: 3200000,
    bedrooms: 4,
    bathrooms: 4,
    area: 2900,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80",
    description: "A spacious villa with a private garden, modern kitchen, and comfortable family spaces."
  },
  {
    id: 6,
    title: "Cozy Modern House",
    type: "House",
    location: "Sharjah, UAE",
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
    description: "A welcoming home with practical spaces, modern finishes, and a convenient location."
  }
];

const formatPrice = price =>
  new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0
  }).format(price);

function propertyCard(property) {
  return `
    <article class="property-card">
      <div class="property-image">
        <img src="${property.image}" alt="${property.title}" loading="lazy">
        <span class="property-tag">${property.status}</span>
      </div>

      <div class="property-info">
        <h3>${property.title}</h3>
        <p class="property-location">📍 ${property.location}</p>

        <div class="property-meta">
          <span>🛏 ${property.bedrooms} Beds</span>
          <span>🚿 ${property.bathrooms} Baths</span>
          <span>📐 ${property.area} sqft</span>
        </div>

        <div class="property-bottom">
          <span class="property-price">${formatPrice(property.price)}</span>
          <a class="view-details" href="property-details.html?id=${property.id}">
            View Details →
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderProperties(elementId, list) {
  const container = document.getElementById(elementId);
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No properties found</h3>
        <p>Try changing your search filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(propertyCard).join("");
}

// Home page featured properties
renderProperties("featuredProperties", properties.slice(0, 3));

// Home page search
document.getElementById("homeSearch")?.addEventListener("click", () => {
  const type = document.getElementById("homeType").value;
  const location = document.getElementById("homeLocation").value.trim();
  const maxPrice = Number(document.getElementById("homeMaxPrice").value);

  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (location) params.set("location", location);
  if (maxPrice > 0) params.set("maxPrice", maxPrice);

  window.location.href = `properties.html?${params.toString()}`;
});

// Properties page filters
const filterType = document.getElementById("filterType");
const filterLocation = document.getElementById("filterLocation");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const resultsCount = document.getElementById("resultsCount");

function applyFilters() {
  const type = filterType.value;
  const location = filterLocation.value.trim().toLowerCase();
  const min = minPrice.value === "" ? 0 : Number(minPrice.value);
  const max = maxPrice.value === "" ? Infinity : Number(maxPrice.value);

  const filtered = properties.filter(property => {
    return (
      (!type || property.type === type) &&
      property.location.toLowerCase().includes(location) &&
      property.price >= min &&
      property.price <= max
    );
  });

  renderProperties("allProperties", filtered);

  if (resultsCount) {
    resultsCount.textContent = `${filtered.length} properties found`;
  }
}

if (document.getElementById("allProperties")) {
  const params = new URLSearchParams(window.location.search);

  filterType.value = params.get("type") || "";
  filterLocation.value = params.get("location") || "";
  maxPrice.value = params.get("maxPrice") || "";

  applyFilters();

  document.getElementById("filterButton").addEventListener("click", applyFilters);

  document.getElementById("resetFilters").addEventListener("click", () => {
    filterType.value = "";
    filterLocation.value = "";
    minPrice.value = "";
    maxPrice.value = "";
    applyFilters();
  });
}

// Property details page
const detailsContainer = document.getElementById("propertyDetails");

if (detailsContainer) {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const property = properties.find(item => item.id === id);

  if (!property) {
    detailsContainer.innerHTML = `
      <div class="empty-state">
        <h2>Property not found</h2>
        <p>This property may no longer be available.</p>
        <a href="properties.html" class="btn btn-primary">Browse Properties</a>
      </div>
    `;

    document.getElementById("inquiryForm")?.remove();
  } else {
    document.title = `${property.title} | EstatePro`;

    detailsContainer.innerHTML = `
      <div class="details-layout">
        <div>
          <img class="details-image" src="${property.image}" alt="${property.title}">
        </div>

        <div class="details-content">
          <span class="eyebrow">${property.status}</span>
          <h1>${property.title}</h1>
          <p>📍 ${property.location}</p>
          <div class="property-price">${formatPrice(property.price)}</div>

          <div class="details-features">
            <div class="feature">🛏 ${property.bedrooms} Bedrooms</div>
            <div class="feature">🚿 ${property.bathrooms} Bathrooms</div>
            <div class="feature">📐 ${property.area} sqft</div>
            <div class="feature">${property.type}</div>
          </div>

          <a href="#inquiry" class="btn btn-primary">Contact About Property</a>

          <div class="details-description">
            <h3>Property Description</h3>
            <p>${property.description}</p>
          </div>
        </div>
      </div>
    `;

    document.getElementById("inquiryPropertyId").value = property.id;
  }
}

// Demo inquiry form
document.getElementById("inquiryForm")?.addEventListener("submit", event => {
  event.preventDefault();

  const inquiry = {
    propertyId: document.getElementById("inquiryPropertyId").value,
    name: document.getElementById("inquiryName").value.trim(),
    email: document.getElementById("inquiryEmail").value.trim(),
    phone: document.getElementById("inquiryPhone").value.trim(),
    message: document.getElementById("inquiryMessage").value.trim(),
    createdAt: new Date().toISOString()
  };

  const inquiries = JSON.parse(localStorage.getItem("estateProInquiries") || "[]");
  inquiries.push(inquiry);
  localStorage.setItem("estateProInquiries", JSON.stringify(inquiries));

  document.getElementById("inquiryFeedback").textContent =
    "Thank you! Your inquiry has been saved in this browser demo.";

  event.target.reset();
});

// Mobile navigation
document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("navLinks")?.classList.toggle("open");
});
