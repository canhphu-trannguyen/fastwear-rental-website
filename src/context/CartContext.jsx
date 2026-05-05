import { useEffect, useMemo, useState } from 'react'
import { CartContext, storageKey } from './cartContextCore'

function createCartItemId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `cart-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function loadStoredCartItems() {
  try {
    const storedItems = localStorage.getItem(storageKey)
    return storedItems ? JSON.parse(storedItems) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadStoredCartItems)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems))
  }, [cartItems])

  function addCartItem(item) {
    setCartItems((currentItems) => [
      ...currentItems,
      {
        ...item,
        id: createCartItemId(),
        addedAt: new Date().toISOString(),
      },
    ])
  }

  function removeCartItem(itemId) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
  }

  function clearCart() {
    setCartItems([])
  }

  const value = useMemo(
    () => ({
      cartItems,
      addCartItem,
      removeCartItem,
      clearCart,
      cartCount: cartItems.length,
    }),
    [cartItems],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
