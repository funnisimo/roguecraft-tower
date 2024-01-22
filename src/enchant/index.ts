/*
  ARTIFACT_COOLDOWN_40 = fl(0),
    - apply
        - add "equip"
            - adjust artifact cooldown stat
        - add "unequip"
            - artifact cooldown auto-recalculates
    - unapply
        - remove triggers

    // PLUGIN - Artifacts
        - add_actor
            - HERO ONLY
            - set artifact cooldown base data
            - add "reset"
                - reset artifact cooldown        

  ARROWS_10 = fl(1),
    - apply
        - add "equip"
            - set flag/tag on actor
        - add "unequip"
            - remove flag/tag from actor
    - unapply
        - remove triggers

    // ITEM - ARROWS
        - pickup
            - check for flag/tag

  LONGER_ROLL_100 = fl(2),
    - apply
        - add "equip"
            - adjust roll cooldown
        - add "unequip"
            - roll cooldown auto-calculates
    - unapply
        - remove triggers

    // PLUGIN - Roll
        - keypress - 'r'
            - initiate roll
        
        - start
            - add action - "roll"
            - add keypress - 'r'
            - add enchant - ROLL_COOLDOWN

        - add_actor
            - add roll cooldown data

    // ACTION - roll
        - figure this out...

  MELEE_DAMAGE_30 = fl(3),
    - apply
        - adjust item damage
    - unapply
        - item damage auto-calculates

  MOBS_TARGET_YOU_MORE = fl(4), // increases notice distance for all mobs?
    - apply
        - add "equip"
            - adjust notice bonus/penalty (global?)
        - add "unequip"
            - notice bonus/penalti auto-calculates
    - unapply
        - remove triggers

  // add ?? MOBS_AVOID_YOU_MORE ??
    - apply
        - add "equip"
            - adjust notice bonus/penalty (global?)
        - add "unequip"
            - notice bonus/penalti auto-calculates
    - unapply
        - remove triggers

  MOVESPEED_AURA_15 = fl(5),
    - apply
        - add "equip"
            - adjust movespeed
        - add "unequip"
            - movespeed auto-calculates
    - unapply
        - remove triggers

  NEGATE_HITS_30 = fl(6),
    - apply
        - add "damage" handler to item
    - unapply
        - remove "damage" handler from item

  POTION_COOLDOWN_40 = fl(7),
    - apply
        - add "equip"
            - add flag/tag to actor
        - add "unequip"
            - remove flag/tag from actor

    // PLUGIN - Potion
        - add_actor
            - add "end_turn" to hero
                - restore potion
        - keypress - 'p'
            - trigger actor "potion"
            - use potion
        - sidebar
            - add potion status bar

  POTION_BOOSTS_DEFENSE = fl(8),
    - apply
        - add "potion"
            - add increased defense with timeout
            - HOW DOES THIS DISPLAY ON SIDEBAR/DETAILS?
            - change sprite color while in effect
    - unapply
        - remove triggers
        
  POTION_HEALS_NEARBY_ALLIES = fl(9),
    - apply
        - add "equip"
            - adds flag/tag to actor
        - add "unequip"
            - removes flag/tag to actor

    // PLUGIN - Potion
        - add_actor
            - add "potion"
                - heal nearby allies too

  RANGED_DAMAGE_30 = fl(10),
    - apply
        - add "attack"  << params tell us it is ranged
            - add 30% to ranged
    - unapply
        - remove "attack"

  REDUCE_DAMAGE_35 = fl(11),
    - apply
        - add "damage"
            - reduce 35%
    - unapply
        - remove "damage"

  WEAPON_DAMAGE_AURA_20 = fl(12), // both melee and ranged
    - apply
        - add "attack"
            - increase 20%
    - unapply
        - remove "attack"
*/
