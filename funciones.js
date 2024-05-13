const getId = (idsMerchantOrders) => {
  if (idsMerchantOrders.length > 0) {
    const idResponse = idsMerchantOrders[0];
    return idResponse;
  } else {
    return null;
  }
};

const deleteId = (idsMerchantOrders) => {
  if (idsMerchantOrders.length > 0) {
    const idDeleted = idsMerchantOrders.slice(0, 1);
    return { id: idDeleted };
  } else {
    return null;
  }
};

export { getId, deleteId };
