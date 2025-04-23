# 🔌 WebSocket API Documentation

## 📡 Client ➔ Server Events

### `subscribe-search`
**Description:** Subscribe to filtered real-time price updates based on symbol or exchange name.

```ts
socket.emit('subscribe-search', 'BTC');
```

**Payload:**
- `string` (e.g. `"BTC"`, `"bitpin"`, `"ETH_IRT"`)

---

## 📡 Server ➔ Client Events

### `grouped-price-update`
**Description:** Send updated prices grouped by exchange name.

```ts
socket.on('grouped-price-update', (data) => {
  // handle grouped price updates
});
```

**Response Format:**
```json
{
  "bitpin": [
    { "symbol": "BTC_USDT", "price": 88450, "isUpdated": true },
    { "symbol": "ETH_IRT", "price": 132000000, "isUpdated": true }
  ],
  "abantether": [
    { "symbol": "BTC_IRT", "price": 456000000, "isUpdated": true }
  ]
}
```

---

### `search-price-update`
**Description:** Real-time filtered prices based on user-provided search term.

```ts
socket.on('search-price-update', (data) => {
  console.log(data);
});
```

**Response Format:**
```json
[
  { "symbol": "BTC_USDT", "exchangeName": "bitpin", "price": 88450 },
  { "symbol": "BTC_IRT", "exchangeName": "abantether", "price": 456000000 }
]
```

---

### `error-log`
**Description:** Send real-time error logs from server.

```ts
socket.on('error-log', (log) => {
  console.warn('Log:', log);
});
```

**Response Format:**
```json
{
  "exchange": "arzinja",
  "message": "Request failed with status code 500",
  "url": "https://api...",
  "level": "error",
  "createdAt": "2025-04-22T21:33:12.000Z"
}
```

---

## 📁 Connection Info
- WebSocket server URL: `ws://localhost:3000` (or your deployed URL)
- Library: `socket.io-client` v4+

