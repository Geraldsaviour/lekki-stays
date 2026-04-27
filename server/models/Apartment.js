const { operations } = require('../db-simple');

class Apartment {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.maxGuests = data.maxGuests;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.pricePerNight = data.pricePerNight;
    this.amenities = data.amenities;
    this.photos = data.photos;
    this.location = data.location;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Static methods for database operations
  static getAll() {
    const apartments = operations.getAllApartments();
    return apartments.map(data => new Apartment(data));
  }

  static getById(id) {
    const data = operations.getApartmentById(id);
    return data ? new Apartment(data) : null;
  }

  static getAvailable(checkin, checkout, guests = null) {
    const apartments = operations.getAllApartments();
    
    return apartments.filter(apartmentData => {
      const apartment = new Apartment(apartmentData);
      
      // Check guest capacity if specified
      if (guests && apartment.maxGuests < guests) {
        return false;
      }
      
      // Check availability for the date range
      if (checkin && checkout) {
        return operations.checkAvailability(apartment.id, checkin, checkout);
      }
      
      return true;
    }).map(data => new Apartment(data));
  }

  // Instance methods
  isAvailable(checkin, checkout) {
    return operations.checkAvailability(this.id, checkin, checkout);
  }

  getBookedDates() {
    return operations.getBookedDates(this.id);
  }

  calculatePricing(checkin, checkout) {
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
      throw new Error('Invalid date range');
    }
    
    const subtotal = this.pricePerNight * nights;
    const serviceFee = 10000; // Fixed service fee
    const total = subtotal + serviceFee;
    
    return {
      pricePerNight: this.pricePerNight,
      nights: nights,
      subtotal: subtotal,
      serviceFee: serviceFee,
      total: total
    };
  }

  // Validation methods
  static validate(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 3) {
      errors.push('Name must be at least 3 characters long');
    }
    
    if (!data.pricePerNight || data.pricePerNight <= 0) {
      errors.push('Price per night must be a positive number');
    }
    
    if (!data.maxGuests || data.maxGuests <= 0) {
      errors.push('Max guests must be a positive number');
    }
    
    if (!data.bedrooms || data.bedrooms <= 0) {
      errors.push('Bedrooms must be a positive number');
    }
    
    if (!data.bathrooms || data.bathrooms <= 0) {
      errors.push('Bathrooms must be a positive number');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Format for API response
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      description: this.description,
      maxGuests: this.maxGuests,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      pricePerNight: this.pricePerNight,
      amenities: this.amenities,
      photos: this.photos,
      location: this.location,
      isActive: this.isActive
    };
  }
}

module.exports = Apartment;