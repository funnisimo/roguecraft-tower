## LEVEL TYPES

- BOSS
- MERCHANT
- ARENA
- TRAIL
- MAZE
- CAVERNS
- ROOMS

## GENERATORS

### Shapes

- Rect
- Blob
- Circle
- Brogue
- Cavern
- Cross
- T
- Huge Cavern
- Donut

### STARTING DIGS

- CentralRoom(w,h, shape)
- CornerRoom(w,h, shape)
- EdgeRoom(w,h,shape)

### Extensions

- AttachRoom(w,h, shape, hallLen)
- ExpandRoom(w,h,shape)

### Modifications

- Lake(w,h)
- Hole(w,h)
- Lava(w,h)
- Bridges(l)
- SubRoom(w,h)
- Stairs(tile)

# CHALLENGES

- WAVES
  - Fixed #+type of opponent
- TOTEMS
  - Attack player with ranged damage/magic
- SUMMONERS
  - Defeat the summoner to stop opponents from spawning
  - SEWER GRATE : Need to push/pull cover over it
  - TOTEM : Destroy it
  - ACTOR : Destroy it
- BOSSES
  - Extra strong mobs, with special abilities
- TRAPS
  - Do not step on me
  - Damage
  - Do stuff - free mobs, open doors
- SECRETS
  - Push walls to move, Push walls to travel through
  - Can we make one way secret doors?
  - Can we make one way doors?
- LEVERS
  - Pull to open doors, etc...
