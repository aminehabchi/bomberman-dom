# Bomberman DOM

![Bomberman Game](./game.png)

A multiplayer Bomberman game built using vanilla JavaScript and WebSockets, without canvas or WebGL. This project implements a classic Bomberman-style game where 2-4 players can battle until one remains standing.

## 🎮 Game Features

- **Multiplayer**: 2-4 players can join and play together in real-time
- **WebSocket Communication**: Real-time game state updates and chat functionality
- **Custom Mini Framework**: Built on top of my [Mini-Framework](https://github.com/yourusername/mini-framework) project
- **Room System**: Create private rooms or join random ones
- **Power-ups**: Collect items to increase bombs, explosion range, and speed
- **Responsive Design**: Fully responsive game interface that works across devices

## 🕹️ How to Play

### Game Controls

- **Movement**: Arrow keys (↑, ↓, ←, →)
- **Place Bomb**: Spacebar

### Game Rules

- Each player starts with 3 lives
- Players are placed in the corners of the map
- Destroy blocks to find power-ups:
  - **Bombs**: Increases the number of bombs you can place simultaneously
  - **Flames**: Increases explosion range in all four directions
  - **Speed**: Increases your movement speed
- Last player standing wins!

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bomberman-dom.git
cd bomberman-dom
```

2. Start the server:

```bash
cd server
node server/
```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
.
├── server
│   ├── bomb            # Bomb logic and explosion handling
│   ├── controllers     # Game controllers
│   ├── moduls          # Core server modules
│   ├── movement        # Player movement logic
│   ├── routes          # API routes
│   └── service         # Game services
└── web
    ├── bomberman
    │   ├── assets      # Game assets (sprites, sounds)
    │   │   ├── player
    │   │   └── powers
    │   ├── components  # Game components
    │   ├── gameLoop    # Main game loop
    │   ├── socket      # WebSocket client implementation
    │   ├── styles      # CSS styles
    │   └── utils       # Utility functions
    └── framework       # Custom mini-framework
```

## 🛠️ Technical Implementation

### Performance Optimization

- Game runs at 60+ FPS at all times
- Efficient use of requestAnimationFrame
- Optimized DOM manipulation
- Performance monitoring and metrics

### Mini-Framework

This project is built on top of my custom mini-framework which provides:

- Component-based architecture
- Virtual DOM-like functionality
- State management
- Event handling

### Multiplayer Implementation

- WebSocket server for real-time communication
- Game state synchronization
- Room management for multiple concurrent games
- Chat functionality

## 🧩 Game Mechanics

### Map Generation

- Fixed walls that cannot be destroyed
- Randomly generated destructible blocks
- Safe starting areas for players
- Power-ups randomly appear when blocks are destroyed

### Room System

- Join random room with other players
- Create private rooms to play with friends
- Room code sharing functionality
- Auto-start when room is full or after waiting period

## 🙏 Acknowledgements

- Original Bomberman game by Hudson Soft
- All contributors and testers
- [Mini-Framework](https://github.com/yourusername/mini-framework) project
