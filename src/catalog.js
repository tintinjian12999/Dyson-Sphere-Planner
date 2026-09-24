// Pinned FactorioLab DSP data; see docs/SOURCES.md.
export const CATALOG = {
  "commit": "3709b0682893e812db365dd31b3d2bb5ef35a6f1",
  "version": {
    "DSP": "0.10.29.21950"
  },
  "recipes": [
    {
      "category": "buildings",
      "id": "tesla-tower",
      "name": "Tesla Tower",
      "time": 1,
      "in": {
        "iron-ingot": 2,
        "magnetic-coil": 1
      },
      "out": {
        "tesla-tower": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "wireless-power-tower",
      "name": "Wireless Power Tower",
      "time": 3,
      "in": {
        "plasma-exciter": 3,
        "tesla-tower": 1
      },
      "out": {
        "wireless-power-tower": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "satellite-substation",
      "name": "Satellite Substation",
      "time": 5,
      "in": {
        "frame-material": 2,
        "super-magnetic-ring": 10,
        "wireless-power-tower": 1
      },
      "out": {
        "satellite-substation": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "wind-turbine",
      "name": "Wind Turbine",
      "time": 4,
      "in": {
        "gear": 1,
        "iron-ingot": 6,
        "magnetic-coil": 3
      },
      "out": {
        "wind-turbine": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "thermal-power-plant",
      "name": "Thermal Power Plant",
      "time": 5,
      "in": {
        "gear": 4,
        "iron-ingot": 10,
        "magnetic-coil": 4,
        "stone-brick": 4
      },
      "out": {
        "thermal-power-plant": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "solar-panel",
      "name": "Solar Panel",
      "time": 6,
      "in": {
        "circuit-board": 5,
        "copper-ingot": 10,
        "high-purity-silicon": 10
      },
      "out": {
        "solar-panel": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "accumulator",
      "name": "Accumulator",
      "time": 3,
      "in": {
        "crystal-silicon": 3,
        "iron-ingot": 6,
        "super-magnetic-ring": 1
      },
      "out": {
        "accumulator": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "geothermal-power-station",
      "name": "Geothermal Power Station",
      "time": 6,
      "in": {
        "copper-ingot": 20,
        "photon-combiner": 4,
        "steel": 15,
        "super-magnetic-ring": 1
      },
      "out": {
        "geothermal-power-station": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "mini-fusion-power-plant",
      "name": "Mini Fusion Power Plant",
      "time": 10,
      "in": {
        "carbon-nanotube": 8,
        "processor": 4,
        "super-magnetic-ring": 10,
        "titanium-alloy": 12
      },
      "out": {
        "mini-fusion-power-plant": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "energy-exchanger",
      "name": "Energy Exchanger",
      "time": 15,
      "in": {
        "particle-container": 8,
        "processor": 40,
        "steel": 40,
        "titanium-alloy": 40
      },
      "out": {
        "energy-exchanger": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "ray-receiver",
      "name": "Ray Receiver",
      "time": 8,
      "in": {
        "high-purity-silicon": 20,
        "photon-combiner": 10,
        "processor": 5,
        "steel": 20,
        "super-magnetic-ring": 20
      },
      "out": {
        "ray-receiver": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "artificial-star",
      "name": "Artificial Star",
      "time": 30,
      "in": {
        "annihilation-constraint-sphere": 10,
        "frame-material": 20,
        "quantum-chip": 10,
        "titanium-alloy": 20
      },
      "out": {
        "artificial-star": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "accumulator-discharge",
      "name": "Accumulator (Discharge)",
      "time": 10,
      "in": {
        "accumulator-full": 1
      },
      "out": {
        "accumulator": 1
      },
      "producers": [
        "energy-exchanger"
      ],
      "row": 0,
      "icon": "accumulator",
      "usage": -54000,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "accumulator-full",
      "name": "Accumulator (full)",
      "time": 10,
      "in": {
        "accumulator": 1
      },
      "out": {
        "accumulator-full": 1
      },
      "producers": [
        "energy-exchanger"
      ],
      "row": 0,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "conveyor-belt-1",
      "name": "Conveyor Belt MK.I",
      "time": 1,
      "in": {
        "gear": 1,
        "iron-ingot": 2
      },
      "out": {
        "conveyor-belt-1": 3
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "conveyor-belt-2",
      "name": "Conveyor Belt MK.II",
      "time": 1,
      "in": {
        "conveyor-belt-1": 3,
        "electromagnetic-turbine": 1
      },
      "out": {
        "conveyor-belt-2": 3
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "conveyor-belt-3",
      "name": "Conveyor Belt MK.III",
      "time": 1,
      "in": {
        "conveyor-belt-2": 3,
        "graphene": 1,
        "super-magnetic-ring": 1
      },
      "out": {
        "conveyor-belt-3": 3
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "splitter",
      "name": "Splitter",
      "time": 2,
      "in": {
        "circuit-board": 1,
        "gear": 2,
        "iron-ingot": 3
      },
      "out": {
        "splitter": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "automatic-piler",
      "name": "Automatic Piler",
      "time": 4,
      "in": {
        "gear": 4,
        "processor": 2,
        "steel": 3,
        "super-magnetic-ring": 1
      },
      "out": {
        "automatic-piler": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "traffic-monitor",
      "name": "Traffic Monitor",
      "time": 2,
      "in": {
        "circuit-board": 2,
        "gear": 2,
        "glass": 1,
        "iron-ingot": 3
      },
      "out": {
        "traffic-monitor": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "spray-coater",
      "name": "Spray Coater",
      "time": 3,
      "in": {
        "circuit-board": 2,
        "microcrystalline-component": 2,
        "plasma-exciter": 2,
        "steel": 4
      },
      "out": {
        "spray-coater": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "storage-1",
      "name": "Depot MK.I",
      "time": 2,
      "in": {
        "iron-ingot": 4,
        "stone-brick": 4
      },
      "out": {
        "storage-1": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "storage-2",
      "name": "Depot MK.II",
      "time": 4,
      "in": {
        "steel": 8,
        "stone-brick": 8
      },
      "out": {
        "storage-2": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "storage-tank",
      "name": "Storage Tank",
      "time": 2,
      "in": {
        "glass": 4,
        "iron-ingot": 8,
        "stone-brick": 4
      },
      "out": {
        "storage-tank": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "logistics-distributor",
      "name": "Logistics Distributor",
      "time": 8,
      "in": {
        "iron-ingot": 8,
        "plasma-exciter": 4,
        "processor": 4
      },
      "out": {
        "logistics-distributor": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "planetary-logistics-station",
      "name": "Planetary Logistics Station",
      "time": 20,
      "in": {
        "particle-container": 20,
        "processor": 40,
        "steel": 40,
        "titanium-ingot": 40
      },
      "out": {
        "planetary-logistics-station": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "interstellar-logistics-station",
      "name": "Interstellar Logistics Station",
      "time": 30,
      "in": {
        "particle-container": 20,
        "planetary-logistics-station": 1,
        "titanium-alloy": 40
      },
      "out": {
        "interstellar-logistics-station": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "orbital-collector",
      "name": "Orbital Collector",
      "time": 30,
      "in": {
        "accumulator-full": 20,
        "interstellar-logistics-station": 1,
        "reinforced-thruster": 20,
        "super-magnetic-ring": 50
      },
      "out": {
        "orbital-collector": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "sorter-1",
      "name": "Sorter MK.I",
      "time": 1,
      "in": {
        "circuit-board": 1,
        "iron-ingot": 1
      },
      "out": {
        "sorter-1": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "sorter-2",
      "name": "Sorter MK.II",
      "time": 1,
      "in": {
        "electric-motor": 1,
        "sorter-1": 2
      },
      "out": {
        "sorter-2": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "sorter-3",
      "name": "Sorter MK.III",
      "time": 1,
      "in": {
        "electromagnetic-turbine": 1,
        "sorter-2": 2
      },
      "out": {
        "sorter-3": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "sorter-4",
      "name": "Pile Sorter",
      "time": 1,
      "in": {
        "processor": 1,
        "sorter-3": 2,
        "super-magnetic-ring": 1
      },
      "out": {
        "sorter-4": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "mining-machine",
      "name": "Mining Machine",
      "time": 3,
      "in": {
        "circuit-board": 2,
        "gear": 2,
        "iron-ingot": 4,
        "magnetic-coil": 2
      },
      "out": {
        "mining-machine": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "advanced-mining-machine",
      "name": "Advanced Mining Machine",
      "time": 20,
      "in": {
        "frame-material": 10,
        "optical-grating-crystal": 40,
        "quantum-chip": 4,
        "super-magnetic-ring": 10,
        "titanium-alloy": 20
      },
      "out": {
        "advanced-mining-machine": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "water-pump",
      "name": "Water Pump",
      "time": 4,
      "in": {
        "circuit-board": 2,
        "electric-motor": 4,
        "iron-ingot": 8,
        "stone-brick": 4
      },
      "out": {
        "water-pump": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "oil-extractor",
      "name": "Oil Extractor",
      "time": 8,
      "in": {
        "circuit-board": 6,
        "plasma-exciter": 4,
        "steel": 12,
        "stone-brick": 12
      },
      "out": {
        "oil-extractor": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "oil-refinery",
      "name": "Oil Refinery",
      "time": 6,
      "in": {
        "circuit-board": 6,
        "plasma-exciter": 6,
        "steel": 10,
        "stone-brick": 10
      },
      "out": {
        "oil-refinery": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "fractionator",
      "name": "Fractionator",
      "time": 3,
      "in": {
        "glass": 4,
        "processor": 1,
        "steel": 8,
        "stone-brick": 4
      },
      "out": {
        "fractionator": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "chemical-plant",
      "name": "Chemical Plant",
      "time": 5,
      "in": {
        "circuit-board": 2,
        "glass": 8,
        "steel": 8,
        "stone-brick": 8
      },
      "out": {
        "chemical-plant": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "quantum-chemical-plant",
      "name": "Quantum Chemical Plant",
      "time": 10,
      "in": {
        "chemical-plant": 1,
        "quantum-chip": 3,
        "strange-matter": 3,
        "titanium-glass": 10
      },
      "out": {
        "quantum-chemical-plant": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "miniature-particle-collider",
      "name": "Miniature Particle Collider",
      "time": 15,
      "in": {
        "frame-material": 20,
        "graphene": 10,
        "processor": 8,
        "super-magnetic-ring": 25,
        "titanium-alloy": 20
      },
      "out": {
        "miniature-particle-collider": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "arc-smelter",
      "name": "Arc Smelter",
      "time": 3,
      "in": {
        "circuit-board": 4,
        "iron-ingot": 4,
        "magnetic-coil": 2,
        "stone-brick": 2
      },
      "out": {
        "arc-smelter": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "plane-smelter",
      "name": "Plane Smelter",
      "time": 5,
      "in": {
        "arc-smelter": 1,
        "frame-material": 5,
        "plane-filter": 4,
        "unipolar-magnet": 15
      },
      "out": {
        "plane-smelter": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-negentropy-smelter",
      "name": "Negentropy Smelter",
      "time": 6,
      "in": {
        "df-energy-shard": 30,
        "df-negentropy-singularity": 10,
        "plane-smelter": 1,
        "quantum-chip": 4
      },
      "out": {
        "df-negentropy-smelter": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "assembling-machine-1",
      "name": "Assembling Machine Mk.I",
      "time": 2,
      "in": {
        "circuit-board": 4,
        "gear": 8,
        "iron-ingot": 4
      },
      "out": {
        "assembling-machine-1": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "assembling-machine-2",
      "name": "Assembling Machine Mk.II",
      "time": 3,
      "in": {
        "assembling-machine-1": 1,
        "graphene": 8,
        "processor": 4
      },
      "out": {
        "assembling-machine-2": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "assembling-machine-3",
      "name": "Assembling Machine Mk.III",
      "time": 4,
      "in": {
        "assembling-machine-2": 1,
        "particle-broadband": 8,
        "quantum-chip": 2
      },
      "out": {
        "assembling-machine-3": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-recomposing-assembler",
      "name": "Re-composing Assembler",
      "time": 5,
      "in": {
        "assembling-machine-3": 1,
        "df-energy-shard": 30,
        "df-matter-recombinator": 10,
        "quantum-chip": 4
      },
      "out": {
        "df-recomposing-assembler": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "matrix-lab",
      "name": "Matrix Lab",
      "time": 3,
      "in": {
        "circuit-board": 4,
        "glass": 4,
        "iron-ingot": 8,
        "magnetic-coil": 4
      },
      "out": {
        "matrix-lab": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-self-evolution-lab",
      "name": "Self-evolution Lab",
      "time": 4,
      "in": {
        "df-dark-fog-matrix": 20,
        "df-silicon-based-neuron": 10,
        "matrix-lab": 1,
        "quantum-chip": 4
      },
      "out": {
        "df-self-evolution-lab": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "holo-beacon",
      "name": "Holo Beacon",
      "time": 4,
      "in": {
        "iron-ingot": 3,
        "prism": 4,
        "plasma-exciter": 2,
        "circuit-board": 2
      },
      "out": {
        "holo-beacon": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "em-rail-ejector",
      "name": "EM-Rail Ejector",
      "time": 6,
      "in": {
        "gear": 20,
        "processor": 5,
        "steel": 20,
        "super-magnetic-ring": 10
      },
      "out": {
        "em-rail-ejector": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "vertical-launching-silo",
      "name": "Vertical Launching Silo",
      "time": 30,
      "in": {
        "frame-material": 30,
        "graviton-lens": 20,
        "quantum-chip": 10,
        "titanium-alloy": 80
      },
      "out": {
        "vertical-launching-silo": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-gauss-turret",
      "name": "Gauss Turret",
      "time": 4,
      "in": {
        "circuit-board": 2,
        "gear": 8,
        "iron-ingot": 8,
        "magnetic-coil": 4
      },
      "out": {
        "df-gauss-turret": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-missile-turret",
      "name": "Missile Turret",
      "time": 6,
      "in": {
        "circuit-board": 12,
        "df-engine": 6,
        "electric-motor": 6,
        "steel": 8
      },
      "out": {
        "df-missile-turret": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-implosion-cannon",
      "name": "Implosion Cannon",
      "time": 5,
      "in": {
        "circuit-board": 10,
        "electric-motor": 8,
        "steel": 10,
        "super-magnetic-ring": 2
      },
      "out": {
        "df-implosion-cannon": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-laser-turret",
      "name": "Laser Turret",
      "time": 6,
      "in": {
        "circuit-board": 6,
        "photon-combiner": 9,
        "plasma-exciter": 6,
        "steel": 9
      },
      "out": {
        "df-laser-turret": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-plasma-turret",
      "name": "Plasma Turret",
      "time": 10,
      "in": {
        "plasma-exciter": 5,
        "processor": 5,
        "super-magnetic-ring": 10,
        "titanium-alloy": 20,
        "titanium-glass": 10
      },
      "out": {
        "df-plasma-turret": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-plasma-turret-sr",
      "name": "SR Plasma Turret",
      "time": 8,
      "in": {
        "plasma-exciter": 5,
        "processor": 5,
        "steel": 15,
        "super-magnetic-ring": 5
      },
      "out": {
        "df-plasma-turret-sr": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-battlefield-analysis-base",
      "name": "Battlefield Analysis Base",
      "time": 6,
      "in": {
        "circuit-board": 18,
        "df-engine": 12,
        "microcrystalline-component": 6,
        "steel": 12
      },
      "out": {
        "df-battlefield-analysis-base": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-jammer-tower",
      "name": "Jammer Tower",
      "time": 5,
      "in": {
        "copper-ingot": 12,
        "diamond": 6,
        "plasma-exciter": 9,
        "processor": 3
      },
      "out": {
        "df-jammer-tower": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-signal-tower",
      "name": "Signal Tower",
      "time": 6,
      "in": {
        "crystal-silicon": 6,
        "steel": 12,
        "wireless-power-tower": 2
      },
      "out": {
        "df-signal-tower": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "buildings",
      "id": "df-planetary-shield-generator",
      "name": "Planetary Shield Generator",
      "time": 10,
      "in": {
        "electromagnetic-turbine": 20,
        "particle-container": 5,
        "steel": 20,
        "super-magnetic-ring": 5
      },
      "out": {
        "df-planetary-shield-generator": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "iron-ingot",
      "name": "Iron Ingot",
      "time": 1,
      "in": {
        "iron-ore": 1
      },
      "out": {
        "iron-ingot": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 1
    },
    {
      "category": "components",
      "id": "copper-ingot",
      "name": "Copper Ingot",
      "time": 1,
      "in": {
        "copper-ore": 1
      },
      "out": {
        "copper-ingot": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 1
    },
    {
      "category": "components",
      "id": "high-purity-silicon",
      "name": "High-purity Silicon",
      "time": 2,
      "in": {
        "silicon-ore": 2
      },
      "out": {
        "high-purity-silicon": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "titanium-ingot",
      "name": "Titanium Ingot",
      "time": 2,
      "in": {
        "titanium-ore": 2
      },
      "out": {
        "titanium-ingot": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "stone-brick",
      "name": "Stone Brick",
      "time": 1,
      "in": {
        "stone": 1
      },
      "out": {
        "stone-brick": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 1
    },
    {
      "category": "components",
      "id": "energetic-graphite",
      "name": "Energetic Graphite",
      "time": 2,
      "in": {
        "coal": 2
      },
      "out": {
        "energetic-graphite": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "plasma-refining",
      "name": "Plasma Refining",
      "time": 4,
      "in": {
        "crude-oil": 2
      },
      "out": {
        "hydrogen": 1,
        "refined-oil": 2
      },
      "producers": [
        "oil-refinery"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "graphene",
      "name": "Graphene",
      "time": 3,
      "in": {
        "energetic-graphite": 3,
        "sulfuric-acid": 1
      },
      "out": {
        "graphene": 2
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "plastic",
      "name": "Plastic",
      "time": 3,
      "in": {
        "energetic-graphite": 1,
        "refined-oil": 2
      },
      "out": {
        "plastic": 1
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "proliferator-1",
      "name": "Proliferator Mk.I",
      "time": 0.5,
      "in": {
        "coal": 1
      },
      "out": {
        "proliferator-1": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "proliferator-2",
      "name": "Proliferator Mk.II",
      "time": 1,
      "in": {
        "diamond": 1,
        "proliferator-1": 2
      },
      "out": {
        "proliferator-2": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "proliferator-3",
      "name": "Proliferator Mk.III",
      "time": 2,
      "in": {
        "carbon-nanotube": 1,
        "proliferator-2": 2
      },
      "out": {
        "proliferator-3": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-magnum-ammo-box",
      "name": "Magnum Ammo Box",
      "time": 1,
      "in": {
        "copper-ingot": 3
      },
      "out": {
        "df-magnum-ammo-box": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-missile-set",
      "name": "Missile Set",
      "time": 2,
      "in": {
        "circuit-board": 3,
        "copper-ingot": 6,
        "df-combustible-unit": 2,
        "df-engine": 1
      },
      "out": {
        "df-missile-set": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 1,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "coal-vein",
      "name": "Coal Veins",
      "cost": 100,
      "time": 2,
      "in": {},
      "out": {
        "coal": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "copper-vein",
      "name": "Copper Veins",
      "cost": 100,
      "time": 2,
      "in": {},
      "out": {
        "copper-ore": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "critical-photon",
      "name": "Critical Photon",
      "cost": 100,
      "time": 60,
      "in": {},
      "out": {
        "critical-photon": 6
      },
      "producers": [
        "ray-receiver"
      ],
      "row": 0,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "critical-photon-graviton",
      "name": "Critical Photon (Graviton Lens)",
      "cost": 100,
      "time": 60,
      "in": {},
      "out": {
        "critical-photon": 12
      },
      "producers": [
        "ray-receiver-pro"
      ],
      "row": 0,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "crude-oil-seep",
      "name": "Crude Oil Seep",
      "cost": 100,
      "time": 1,
      "in": {},
      "out": {
        "crude-oil": 1
      },
      "producers": [
        "oil-extractor"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "fire-ice-vein",
      "name": "Fire Ice Vein",
      "cost": 200,
      "time": 2,
      "in": {},
      "out": {
        "fire-ice": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "fractal-silicon-vein",
      "name": "Fractal Silicon Veins",
      "cost": 200,
      "time": 2,
      "in": {},
      "out": {
        "fractal-silicon": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "iron-vein",
      "name": "Iron Veins",
      "cost": 100,
      "time": 2,
      "in": {},
      "out": {
        "iron-ore": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "kimberlite-vein",
      "name": "Kimberlite Veins",
      "cost": 200,
      "time": 2,
      "in": {},
      "out": {
        "kimberlite-ore": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "ocean",
      "name": "Ocean",
      "cost": 1,
      "time": 1.2,
      "in": {},
      "out": {
        "water": 1
      },
      "producers": [
        "water-pump"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "optical-grating-crystal-vein",
      "name": "Grating Crystal Vein",
      "cost": 200,
      "time": 2,
      "in": {},
      "out": {
        "optical-grating-crystal": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "organic-crystal-vein",
      "name": "Organic Crystal Veins",
      "cost": 200,
      "time": 2,
      "in": {},
      "out": {
        "organic-crystal": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "silicium-vein",
      "name": "Silicon Veins",
      "cost": 100,
      "time": 2,
      "in": {},
      "out": {
        "silicon-ore": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "spiniform-stalagmite-crystal-vein",
      "name": "Stalagmite Crystal Vein",
      "cost": 200,
      "time": 2,
      "in": {},
      "out": {
        "spiniform-stalagmite-crystal": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "stone-vein",
      "name": "Stone Veins",
      "cost": 100,
      "time": 2,
      "in": {},
      "out": {
        "stone": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "sulphuric-acid-vein",
      "name": "Sulphuric Acid Ocean",
      "cost": 100,
      "time": 1.2,
      "in": {},
      "out": {
        "sulfuric-acid": 1
      },
      "producers": [
        "water-pump"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "titanium-vein",
      "name": "Titanium Veins",
      "cost": 100,
      "time": 2,
      "in": {},
      "out": {
        "titanium-ore": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "unipolar-magnet-vein",
      "name": "Unipolar Magnet Veins",
      "cost": 200,
      "time": 2,
      "in": {},
      "out": {
        "unipolar-magnet": 1
      },
      "producers": [
        "mining-machine",
        "advanced-mining-machine"
      ],
      "row": 0,
      "flags": [
        "mining"
      ]
    },
    {
      "category": "components",
      "id": "magnet",
      "name": "Magnet",
      "time": 1.5,
      "in": {
        "iron-ore": 1
      },
      "out": {
        "magnet": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 2
    },
    {
      "category": "components",
      "id": "magnetic-coil",
      "name": "Magnetic Coil",
      "time": 1,
      "in": {
        "copper-ingot": 1,
        "magnet": 2
      },
      "out": {
        "magnetic-coil": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2
    },
    {
      "category": "components",
      "id": "crystal-silicon",
      "name": "Crystal Silicon",
      "time": 2,
      "in": {
        "high-purity-silicon": 1
      },
      "out": {
        "crystal-silicon": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "titanium-alloy",
      "name": "Titanium Alloy",
      "time": 12,
      "in": {
        "steel": 4,
        "sulfuric-acid": 8,
        "titanium-ingot": 4
      },
      "out": {
        "titanium-alloy": 4
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "glass",
      "name": "Glass",
      "time": 2,
      "in": {
        "stone": 2
      },
      "out": {
        "glass": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "diamond",
      "name": "Diamond",
      "time": 2,
      "in": {
        "energetic-graphite": 1
      },
      "out": {
        "diamond": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "x-ray-cracking",
      "name": "X-ray Cracking",
      "time": 4,
      "in": {
        "hydrogen": 2,
        "refined-oil": 1
      },
      "out": {
        "energetic-graphite": 1,
        "hydrogen": 3
      },
      "producers": [
        "oil-refinery"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "graphene-advanced",
      "name": "Graphene (advanced)",
      "time": 2,
      "in": {
        "fire-ice": 2
      },
      "out": {
        "graphene": 2,
        "hydrogen": 1
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "organic-crystal",
      "name": "Organic Crystal",
      "time": 6,
      "in": {
        "plastic": 2,
        "refined-oil": 1,
        "water": 1
      },
      "out": {
        "organic-crystal": 1
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-combustible-unit",
      "name": "Combustible Unit",
      "time": 3,
      "in": {
        "coal": 3
      },
      "out": {
        "df-combustible-unit": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-explosive-unit",
      "name": "Explosive Unit",
      "time": 6,
      "in": {
        "df-combustible-unit": 2,
        "plastic": 2,
        "sulfuric-acid": 1
      },
      "out": {
        "df-explosive-unit": 2
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-crystal-explosive-unit",
      "name": "Crystal Explosive Unit",
      "time": 24,
      "in": {
        "casimir-crystal": 1,
        "crystal-silicon": 8,
        "df-explosive-unit": 8
      },
      "out": {
        "df-crystal-explosive-unit": 8
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-titanium-ammo-box",
      "name": "Titanium Ammo Box",
      "time": 2,
      "in": {
        "df-magnum-ammo-box": 1,
        "titanium-ingot": 2
      },
      "out": {
        "df-titanium-ammo-box": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-supersonic-missile-set",
      "name": "Supersonic Missile Set",
      "time": 4,
      "in": {
        "df-explosive-unit": 4,
        "df-missile-set": 2,
        "processor": 4,
        "thruster": 2
      },
      "out": {
        "df-supersonic-missile-set": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 2,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "steel",
      "name": "Steel",
      "time": 3,
      "in": {
        "iron-ingot": 3
      },
      "out": {
        "steel": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "electric-motor",
      "name": "Electric Motor",
      "time": 2,
      "in": {
        "gear": 1,
        "iron-ingot": 2,
        "magnetic-coil": 1
      },
      "out": {
        "electric-motor": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "crystal-silicon-advanced",
      "name": "Crystal Silicon (advanced)",
      "time": 1.5,
      "in": {
        "fractal-silicon": 1
      },
      "out": {
        "crystal-silicon": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "titanium-glass",
      "name": "Titanium Glass",
      "time": 5,
      "in": {
        "glass": 2,
        "titanium-ingot": 2,
        "water": 2
      },
      "out": {
        "titanium-glass": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "prism",
      "name": "Prism",
      "time": 2,
      "in": {
        "glass": 3
      },
      "out": {
        "prism": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "diamond-advanced",
      "name": "Diamond (advanced)",
      "time": 1.5,
      "in": {
        "kimberlite-ore": 1
      },
      "out": {
        "diamond": 2
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "reforming-refine",
      "name": "Reformed Refinement",
      "time": 4,
      "in": {
        "coal": 1,
        "hydrogen": 1,
        "refined-oil": 2
      },
      "out": {
        "refined-oil": 3
      },
      "producers": [
        "oil-refinery"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "titanium-crystal",
      "name": "Titanium Crystal",
      "time": 4,
      "in": {
        "organic-crystal": 1,
        "titanium-ingot": 3
      },
      "out": {
        "titanium-crystal": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "organic-crystal-original",
      "name": "Organic Crystal (original)",
      "time": 6,
      "in": {
        "log": 20,
        "plant-fuel": 30,
        "water": 10
      },
      "out": {
        "organic-crystal": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-engine",
      "name": "Engine",
      "time": 3,
      "in": {
        "copper-ingot": 2,
        "magnetic-coil": 1
      },
      "out": {
        "df-engine": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "thruster",
      "name": " - Thruster",
      "time": 4,
      "in": {
        "copper-ingot": 3,
        "steel": 2
      },
      "out": {
        "thruster": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "reinforced-thruster",
      "name": "Reinforced Thruster",
      "time": 6,
      "in": {
        "electromagnetic-turbine": 5,
        "titanium-alloy": 5
      },
      "out": {
        "reinforced-thruster": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-superalloy-ammo-box",
      "name": "Superalloy Ammo Box",
      "time": 3,
      "in": {
        "df-titanium-ammo-box": 1,
        "titanium-alloy": 1
      },
      "out": {
        "df-superalloy-ammo-box": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-gravity-missile-set",
      "name": "Gravity Missile Set",
      "time": 6,
      "in": {
        "df-crystal-explosive-unit": 6,
        "df-supersonic-missile-set": 3,
        "strange-matter": 3
      },
      "out": {
        "df-gravity-missile-set": 3
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 3,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "gear",
      "name": "Gear",
      "time": 1,
      "in": {
        "iron-ingot": 1
      },
      "out": {
        "gear": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4
    },
    {
      "category": "components",
      "id": "electromagnetic-turbine",
      "name": "Electromagnetic Turbine",
      "time": 2,
      "in": {
        "electric-motor": 2,
        "magnetic-coil": 2
      },
      "out": {
        "electromagnetic-turbine": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "silicon-ore",
      "name": "Silicon Ore",
      "time": 10,
      "in": {
        "stone": 10
      },
      "out": {
        "silicon-ore": 1
      },
      "producers": [
        "arc-smelter",
        "plane-smelter",
        "df-negentropy-smelter"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "circuit-board",
      "name": "Circuit Board",
      "time": 1,
      "in": {
        "copper-ingot": 1,
        "iron-ingot": 2
      },
      "out": {
        "circuit-board": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4
    },
    {
      "category": "components",
      "id": "graviton-lens",
      "name": "Graviton Lens",
      "time": 6,
      "in": {
        "diamond": 4,
        "strange-matter": 1
      },
      "out": {
        "graviton-lens": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "sulfuric-acid",
      "name": "Sulfuric Acid",
      "time": 6,
      "in": {
        "refined-oil": 6,
        "stone": 8,
        "water": 4
      },
      "out": {
        "sulfuric-acid": 4
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "deuterium-fractionation",
      "name": "Deuterium Fractionation",
      "time": 1,
      "in": {
        "hydrogen": 0.01
      },
      "out": {
        "deuterium": 0.01
      },
      "producers": [
        "fractionator"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "carbon-nanotube",
      "name": "Carbon Nanotube",
      "time": 4,
      "in": {
        "graphene": 3,
        "titanium-ingot": 1
      },
      "out": {
        "carbon-nanotube": 2
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "strange-matter",
      "name": "Strange Matter",
      "time": 8,
      "in": {
        "deuterium": 10,
        "iron-ingot": 2,
        "particle-container": 2
      },
      "out": {
        "strange-matter": 1
      },
      "producers": [
        "miniature-particle-collider"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "logistics-bot",
      "name": "Logistics Bot",
      "time": 2,
      "in": {
        "df-engine": 1,
        "iron-ingot": 2,
        "processor": 1
      },
      "out": {
        "logistics-bot": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "logistics-drone",
      "name": "Logistics Drone",
      "time": 4,
      "in": {
        "iron-ingot": 5,
        "processor": 2,
        "thruster": 2
      },
      "out": {
        "logistics-drone": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "logistics-vessel",
      "name": "Interstellar Logistics Vessel",
      "time": 6,
      "in": {
        "processor": 10,
        "reinforced-thruster": 2,
        "titanium-alloy": 10
      },
      "out": {
        "logistics-vessel": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-plasma-capsule",
      "name": "Plasma Capsule",
      "time": 2,
      "in": {
        "deuterium": 10,
        "graphene": 1,
        "magnet": 2
      },
      "out": {
        "df-plasma-capsule": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-shell-set",
      "name": "Shell Set",
      "time": 1.5,
      "in": {
        "copper-ingot": 9,
        "df-combustible-unit": 2
      },
      "out": {
        "df-shell-set": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 4,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "plasma-exciter",
      "name": "Plasma Exciter",
      "time": 2,
      "in": {
        "magnetic-coil": 4,
        "prism": 2
      },
      "out": {
        "plasma-exciter": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "super-magnetic-ring",
      "name": "Super-magnetic Ring",
      "time": 3,
      "in": {
        "electromagnetic-turbine": 2,
        "energetic-graphite": 1,
        "magnet": 3
      },
      "out": {
        "super-magnetic-ring": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "particle-broadband",
      "name": "Particle Broadband",
      "time": 8,
      "in": {
        "carbon-nanotube": 2,
        "crystal-silicon": 2,
        "plastic": 1
      },
      "out": {
        "particle-broadband": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "processor",
      "name": "Processor",
      "time": 3,
      "in": {
        "circuit-board": 2,
        "microcrystalline-component": 2
      },
      "out": {
        "processor": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "casimir-crystal",
      "name": "Casimir Crystal",
      "time": 4,
      "in": {
        "graphene": 2,
        "hydrogen": 12,
        "titanium-crystal": 1
      },
      "out": {
        "casimir-crystal": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "particle-container",
      "name": "Particle Container",
      "time": 4,
      "in": {
        "copper-ingot": 2,
        "electromagnetic-turbine": 2,
        "graphene": 2
      },
      "out": {
        "particle-container": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "deuterium",
      "name": "Deuterium",
      "time": 2.5,
      "in": {
        "hydrogen": 10
      },
      "out": {
        "deuterium": 5
      },
      "producers": [
        "miniature-particle-collider"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "carbon-nanotube-advanced",
      "name": "Carbon Nanotube (advanced)",
      "time": 4,
      "in": {
        "spiniform-stalagmite-crystal": 6
      },
      "out": {
        "carbon-nanotube": 2
      },
      "producers": [
        "chemical-plant",
        "quantum-chemical-plant"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "solar-sail",
      "name": "Solar Sail",
      "time": 4,
      "in": {
        "graphene": 1,
        "photon-combiner": 1
      },
      "out": {
        "solar-sail": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "frame-material",
      "name": "Frame Material",
      "time": 6,
      "in": {
        "carbon-nanotube": 4,
        "high-purity-silicon": 1,
        "titanium-alloy": 1
      },
      "out": {
        "frame-material": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "dyson-sphere-component",
      "name": "Dyson Sphere Component",
      "time": 8,
      "in": {
        "frame-material": 3,
        "processor": 3,
        "solar-sail": 3
      },
      "out": {
        "dyson-sphere-component": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "small-carrier-rocket",
      "name": "Small Carrier Rocket",
      "time": 6,
      "in": {
        "deuteron-fuel-rod": 4,
        "dyson-sphere-component": 2,
        "quantum-chip": 2
      },
      "out": {
        "small-carrier-rocket": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-antimatter-capsule",
      "name": "Antimatter Capsule",
      "time": 2,
      "in": {
        "antimatter": 10,
        "df-plasma-capsule": 1,
        "hydrogen": 10,
        "particle-container": 1
      },
      "out": {
        "df-antimatter-capsule": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-high-explosive-shell-set",
      "name": "High-Explosive Shell Set",
      "time": 3,
      "in": {
        "df-explosive-unit": 2,
        "df-shell-set": 1,
        "titanium-ingot": 6
      },
      "out": {
        "df-high-explosive-shell-set": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 5,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "photon-combiner",
      "name": "Photon Combiner",
      "time": 3,
      "in": {
        "circuit-board": 1,
        "prism": 2
      },
      "out": {
        "photon-combiner": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "photon-combiner-advanced",
      "name": "Photon Combiner (advanced)",
      "time": 3,
      "in": {
        "circuit-board": 1,
        "optical-grating-crystal": 1
      },
      "out": {
        "photon-combiner": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "microcrystalline-component",
      "name": "Microcrystalline Component",
      "time": 2,
      "in": {
        "copper-ingot": 1,
        "high-purity-silicon": 2
      },
      "out": {
        "microcrystalline-component": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "quantum-chip",
      "name": "Quantum Chip",
      "time": 6,
      "in": {
        "plane-filter": 2,
        "processor": 2
      },
      "out": {
        "quantum-chip": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "casimir-crystal-advanced",
      "name": "Casimir Crystal (advanced)",
      "time": 4,
      "in": {
        "graphene": 2,
        "hydrogen": 12,
        "optical-grating-crystal": 8
      },
      "out": {
        "casimir-crystal": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "particle-container-advanced",
      "name": "Particle Container (advanced)",
      "time": 4,
      "in": {
        "copper-ingot": 2,
        "unipolar-magnet": 10
      },
      "out": {
        "particle-container": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "plane-filter",
      "name": "Plane Filter",
      "time": 12,
      "in": {
        "casimir-crystal": 1,
        "titanium-glass": 2
      },
      "out": {
        "plane-filter": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "annihilation-constraint-sphere",
      "name": "Annihilation Constraint Sphere",
      "time": 20,
      "in": {
        "particle-container": 1,
        "processor": 1
      },
      "out": {
        "annihilation-constraint-sphere": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "hydrogen-fuel-rod",
      "name": "Hydrogen Fuel Rod",
      "time": 6,
      "in": {
        "hydrogen": 10,
        "titanium-ingot": 1
      },
      "out": {
        "hydrogen-fuel-rod": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "deuteron-fuel-rod",
      "name": "Deuteron Fuel Rod",
      "time": 12,
      "in": {
        "deuterium": 20,
        "super-magnetic-ring": 1,
        "titanium-alloy": 1
      },
      "out": {
        "deuteron-fuel-rod": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "antimatter-fuel-rod",
      "name": "Antimatter Fuel Rod",
      "time": 24,
      "in": {
        "annihilation-constraint-sphere": 1,
        "antimatter": 12,
        "hydrogen": 12,
        "titanium-alloy": 1
      },
      "out": {
        "antimatter-fuel-rod": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-strange-annihilation-fuel-rod",
      "name": "Strange Annihilation Fuel Rod",
      "time": 32,
      "in": {
        "antimatter-fuel-rod": 8,
        "df-core-element": 1,
        "frame-material": 1,
        "strange-matter": 2
      },
      "out": {
        "df-strange-annihilation-fuel-rod": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-jamming-capsule",
      "name": "Jamming Capsule",
      "time": 2,
      "in": {
        "electromagnetic-turbine": 1,
        "hydrogen": 3,
        "plasma-exciter": 1
      },
      "out": {
        "df-jamming-capsule": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-crystal-shell-set",
      "name": "Crystal Shell Set",
      "time": 6,
      "in": {
        "df-crystal-explosive-unit": 2,
        "df-high-explosive-shell-set": 1,
        "titanium-alloy": 3
      },
      "out": {
        "df-crystal-shell-set": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 6,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-prototype",
      "name": "Prototype",
      "time": 2,
      "in": {
        "circuit-board": 2,
        "df-engine": 1,
        "iron-ingot": 3,
        "plasma-exciter": 1
      },
      "out": {
        "df-prototype": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-precision-drone",
      "name": "Precision Drone",
      "time": 4,
      "in": {
        "circuit-board": 2,
        "df-prototype": 1,
        "electromagnetic-turbine": 1,
        "photon-combiner": 2
      },
      "out": {
        "df-precision-drone": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-attack-drone",
      "name": "Attack Drone",
      "time": 4,
      "in": {
        "df-prototype": 1,
        "electromagnetic-turbine": 1,
        "particle-container": 1,
        "processor": 1
      },
      "out": {
        "df-attack-drone": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-corvette",
      "name": "Corvette",
      "time": 5,
      "in": {
        "particle-container": 3,
        "processor": 2,
        "reinforced-thruster": 1,
        "titanium-alloy": 5
      },
      "out": {
        "df-corvette": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-destroyer",
      "name": "Destroyer",
      "time": 8,
      "in": {
        "frame-material": 20,
        "processor": 4,
        "reinforced-thruster": 4,
        "strange-matter": 1
      },
      "out": {
        "df-destroyer": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "space-warper",
      "name": "Space Warper",
      "time": 10,
      "in": {
        "graviton-lens": 1
      },
      "out": {
        "space-warper": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "space-warper-advanced",
      "name": "Space Warper (advanced)",
      "time": 10,
      "in": {
        "gravity-matrix": 1
      },
      "out": {
        "space-warper": 8
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "mass-energy-storage",
      "name": "Mass-energy Storage",
      "cost": 100,
      "time": 2,
      "in": {
        "critical-photon": 2
      },
      "out": {
        "antimatter": 2,
        "hydrogen": 2
      },
      "producers": [
        "miniature-particle-collider"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "df-suppressing-capsule",
      "name": "Suppressing Capsule",
      "time": 8,
      "in": {
        "df-jamming-capsule": 2,
        "super-magnetic-ring": 1,
        "titanium-glass": 2
      },
      "out": {
        "df-suppressing-capsule": 2
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "foundation",
      "name": "Foundation",
      "time": 1,
      "in": {
        "steel": 1,
        "stone-brick": 3
      },
      "out": {
        "foundation": 1
      },
      "producers": [
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "df-recomposing-assembler"
      ],
      "row": 7,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "electromagnetic-matrix",
      "name": "Electromagnetic Matrix",
      "time": 3,
      "in": {
        "circuit-board": 1,
        "magnetic-coil": 1
      },
      "out": {
        "electromagnetic-matrix": 1
      },
      "producers": [
        "matrix-lab",
        "df-self-evolution-lab"
      ],
      "row": 8,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "energy-matrix",
      "name": "Energy Matrix",
      "time": 6,
      "in": {
        "energetic-graphite": 2,
        "hydrogen": 2
      },
      "out": {
        "energy-matrix": 1
      },
      "producers": [
        "matrix-lab",
        "df-self-evolution-lab"
      ],
      "row": 8,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "structure-matrix",
      "name": "Structure Matrix",
      "time": 8,
      "in": {
        "diamond": 1,
        "titanium-crystal": 1
      },
      "out": {
        "structure-matrix": 1
      },
      "producers": [
        "matrix-lab",
        "df-self-evolution-lab"
      ],
      "row": 8,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "information-matrix",
      "name": "Information Matrix",
      "time": 10,
      "in": {
        "particle-broadband": 1,
        "processor": 2
      },
      "out": {
        "information-matrix": 1
      },
      "producers": [
        "matrix-lab",
        "df-self-evolution-lab"
      ],
      "row": 8,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "gravity-matrix",
      "name": "Gravity Matrix",
      "time": 24,
      "in": {
        "graviton-lens": 1,
        "quantum-chip": 1
      },
      "out": {
        "gravity-matrix": 2
      },
      "producers": [
        "matrix-lab",
        "df-self-evolution-lab"
      ],
      "row": 8,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "universe-matrix",
      "name": "Universe Matrix",
      "time": 15,
      "in": {
        "antimatter": 1,
        "electromagnetic-matrix": 1,
        "energy-matrix": 1,
        "gravity-matrix": 1,
        "information-matrix": 1,
        "structure-matrix": 1
      },
      "out": {
        "universe-matrix": 1
      },
      "producers": [
        "matrix-lab",
        "df-self-evolution-lab"
      ],
      "row": 8,
      "flags": [
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "gas-giant",
      "name": "Gas Giant",
      "time": 1,
      "in": {},
      "out": {
        "deuterium": 0.32,
        "hydrogen": 7.68
      },
      "producers": [
        "orbital-collector"
      ],
      "row": 9,
      "icon": "gas-giants-exploitation",
      "flags": [
        "mining",
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "gas-giant-deuterium",
      "name": "Gas Giant (Deuterium)",
      "time": 1,
      "in": {},
      "out": {
        "deuterium": 0.32
      },
      "producers": [
        "orbital-collector"
      ],
      "row": 9,
      "icon": "gas-giants-exploitation",
      "flags": [
        "mining",
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "gas-giant-hydrogen",
      "name": "Gas Giant (Hydrogen)",
      "time": 1,
      "in": {},
      "out": {
        "hydrogen": 7.68
      },
      "producers": [
        "orbital-collector"
      ],
      "row": 9,
      "icon": "gas-giants-exploitation",
      "flags": [
        "mining",
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "ice-giant",
      "name": "Ice Giant",
      "time": 1,
      "in": {},
      "out": {
        "fire-ice": 5.6,
        "hydrogen": 2.4
      },
      "producers": [
        "orbital-collector"
      ],
      "row": 9,
      "icon": "gas-giants-exploitation",
      "flags": [
        "mining",
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "ice-giant-gas-hydrate",
      "name": "Ice Giant (Fire Ice)",
      "time": 1,
      "in": {},
      "out": {
        "fire-ice": 5.6
      },
      "producers": [
        "orbital-collector"
      ],
      "row": 9,
      "icon": "gas-giants-exploitation",
      "flags": [
        "mining",
        "locked"
      ]
    },
    {
      "category": "components",
      "id": "ice-giant-hydrogen",
      "name": "Ice Giant (Hydrogen)",
      "time": 1,
      "in": {},
      "out": {
        "hydrogen": 2.4
      },
      "producers": [
        "orbital-collector"
      ],
      "row": 9,
      "icon": "gas-giants-exploitation",
      "flags": [
        "mining",
        "locked"
      ]
    }
  ],
  "items": [
    {
      "category": "buildings",
      "id": "tesla-tower",
      "name": "Tesla Tower",
      "row": 0,
      "stack": 100
    },
    {
      "category": "buildings",
      "id": "wireless-power-tower",
      "name": "Wireless Power Tower",
      "row": 0,
      "stack": 100,
      "machine": {
        "drain": 90,
        "type": "electric",
        "usage": 4800
      }
    },
    {
      "category": "buildings",
      "id": "satellite-substation",
      "name": "Satellite Substation",
      "row": 0,
      "stack": 30,
      "machine": {
        "drain": 720,
        "type": "electric",
        "usage": 0
      }
    },
    {
      "category": "buildings",
      "id": "wind-turbine",
      "name": "Wind Turbine",
      "row": 0,
      "stack": 50,
      "machine": {
        "speed": 1,
        "type": "electric",
        "usage": -300
      }
    },
    {
      "category": "buildings",
      "id": "thermal-power-plant",
      "name": "Thermal Power Plant",
      "row": 0,
      "stack": 50,
      "machine": {
        "fuelCategories": [
          "chemical"
        ],
        "speed": 1,
        "type": "burner"
      }
    },
    {
      "category": "buildings",
      "id": "solar-panel",
      "name": "Solar Panel",
      "row": 0,
      "stack": 50,
      "machine": {
        "speed": 1,
        "type": "electric",
        "usage": -360
      }
    },
    {
      "category": "buildings",
      "id": "geothermal-power-station",
      "name": "Geothermal Power Station",
      "row": 0,
      "stack": 50,
      "machine": {
        "speed": 1,
        "type": "electric",
        "usage": -4800
      }
    },
    {
      "category": "buildings",
      "id": "mini-fusion-power-plant",
      "name": "Mini Fusion Power Plant",
      "row": 0,
      "stack": 50,
      "machine": {
        "fuelCategories": [
          "nuclear"
        ],
        "speed": 1,
        "type": "burner"
      }
    },
    {
      "category": "buildings",
      "id": "energy-exchanger",
      "name": "Energy Exchanger",
      "row": 0,
      "stack": 20,
      "machine": {
        "speed": 1,
        "type": "electric",
        "usage": 54000
      }
    },
    {
      "category": "buildings",
      "id": "accumulator",
      "name": "Accumulator",
      "row": 0,
      "stack": 50
    },
    {
      "category": "buildings",
      "id": "accumulator-full",
      "name": "Accumulator (full)",
      "row": 0,
      "stack": 50,
      "fuel": {
        "category": "accumulator",
        "value": 540
      }
    },
    {
      "category": "buildings",
      "id": "ray-receiver",
      "name": "Ray Receiver",
      "row": 0,
      "stack": 20,
      "machine": {
        "speed": 1
      }
    },
    {
      "category": "buildings",
      "id": "artificial-star",
      "name": "Artificial Star",
      "row": 0,
      "stack": 20,
      "machine": {
        "fuelCategories": [
          "antimatter"
        ],
        "speed": 1,
        "type": "burner"
      }
    },
    {
      "category": "buildings",
      "id": "conveyor-belt-1",
      "name": "Conveyor Belt MK.I",
      "row": 1,
      "stack": 300,
      "belt": {
        "speed": 6
      }
    },
    {
      "category": "buildings",
      "id": "conveyor-belt-2",
      "name": "Conveyor Belt MK.II",
      "row": 1,
      "stack": 300,
      "belt": {
        "speed": 12
      }
    },
    {
      "category": "buildings",
      "id": "conveyor-belt-3",
      "name": "Conveyor Belt MK.III",
      "row": 1,
      "stack": 300,
      "belt": {
        "speed": 30
      }
    },
    {
      "category": "buildings",
      "id": "splitter",
      "name": "Splitter",
      "row": 1,
      "stack": 50
    },
    {
      "category": "buildings",
      "id": "automatic-piler",
      "name": "Automatic Piler",
      "row": 1,
      "stack": 50,
      "machine": {
        "drain": 9,
        "speed": 1,
        "type": "electric",
        "usage": 144
      }
    },
    {
      "category": "buildings",
      "id": "traffic-monitor",
      "name": "Traffic Monitor",
      "row": 1,
      "stack": 100,
      "machine": {
        "drain": 9,
        "type": "electric",
        "usage": 36
      }
    },
    {
      "category": "buildings",
      "id": "spray-coater",
      "name": "Spray Coater",
      "row": 1,
      "stack": 50,
      "machine": {
        "drain": 4.5,
        "modules": 1,
        "speed": 1,
        "type": "electric",
        "usage": 90
      }
    },
    {
      "category": "buildings",
      "id": "storage-1",
      "name": "Depot MK.I",
      "row": 1,
      "stack": 50
    },
    {
      "category": "buildings",
      "id": "storage-2",
      "name": "Depot MK.II",
      "row": 1,
      "stack": 50
    },
    {
      "category": "buildings",
      "id": "storage-tank",
      "name": "Storage Tank",
      "row": 1,
      "stack": 50
    },
    {
      "category": "buildings",
      "id": "logistics-distributor",
      "name": "Logistics Distributor",
      "row": 1,
      "stack": 50,
      "machine": {
        "drain": 18,
        "speed": 1,
        "type": "electric",
        "usage": 9000
      }
    },
    {
      "category": "buildings",
      "id": "planetary-logistics-station",
      "name": "Planetary Logistics Station",
      "row": 1,
      "stack": 10,
      "machine": {
        "drain": 60,
        "speed": 1,
        "type": "electric",
        "usage": 60000
      }
    },
    {
      "category": "buildings",
      "id": "interstellar-logistics-station",
      "name": "Interstellar Logistics Station",
      "row": 1,
      "stack": 10,
      "machine": {
        "drain": 60,
        "speed": 1,
        "type": "electric",
        "usage": 300000
      }
    },
    {
      "category": "buildings",
      "id": "orbital-collector",
      "name": "Orbital Collector",
      "row": 1,
      "stack": 10,
      "machine": {
        "speed": 1
      }
    },
    {
      "category": "buildings",
      "id": "sorter-1",
      "name": "Sorter MK.I",
      "row": 2,
      "stack": 200,
      "machine": {
        "drain": 9,
        "speed": 1,
        "type": "electric",
        "usage": 18
      }
    },
    {
      "category": "buildings",
      "id": "sorter-2",
      "name": "Sorter MK.II",
      "row": 2,
      "stack": 200,
      "machine": {
        "drain": 9,
        "speed": 1,
        "type": "electric",
        "usage": 36
      }
    },
    {
      "category": "buildings",
      "id": "sorter-3",
      "name": "Sorter MK.III",
      "row": 2,
      "stack": 200,
      "machine": {
        "drain": 9,
        "speed": 1,
        "type": "electric",
        "usage": 72
      }
    },
    {
      "category": "buildings",
      "id": "sorter-4",
      "name": "Pile Sorter",
      "row": 2,
      "stack": 200,
      "machine": {
        "drain": 9,
        "speed": 1,
        "type": "electric",
        "usage": 144
      }
    },
    {
      "category": "buildings",
      "id": "mining-machine",
      "name": "Mining Machine",
      "row": 2,
      "stack": 50,
      "machine": {
        "speed": 1,
        "totalRecipe": true
      }
    },
    {
      "category": "buildings",
      "id": "advanced-mining-machine",
      "name": "Advanced Mining Machine",
      "row": 2,
      "stack": 30,
      "machine": {
        "speed": 2,
        "totalRecipe": true
      }
    },
    {
      "category": "buildings",
      "id": "water-pump",
      "name": "Water Pump",
      "row": 2,
      "stack": 30,
      "machine": {
        "drain": 12,
        "speed": 1,
        "type": "electric",
        "usage": 300
      }
    },
    {
      "category": "buildings",
      "id": "oil-extractor",
      "name": "Oil Extractor",
      "row": 2,
      "stack": 20,
      "machine": {
        "drain": 24,
        "speed": 1,
        "type": "electric",
        "usage": 840
      }
    },
    {
      "category": "buildings",
      "id": "oil-refinery",
      "name": "Oil Refinery",
      "row": 2,
      "stack": 30,
      "machine": {
        "drain": 24,
        "modules": 1,
        "speed": 1,
        "type": "electric",
        "usage": 960
      }
    },
    {
      "category": "buildings",
      "id": "fractionator",
      "name": "Fractionator",
      "row": 2,
      "stack": 30,
      "machine": {
        "drain": 18,
        "modules": 1,
        "type": "electric",
        "usage": 720
      }
    },
    {
      "category": "buildings",
      "id": "chemical-plant",
      "name": "Chemical Plant",
      "row": 2,
      "stack": 30,
      "machine": {
        "drain": 24,
        "modules": 1,
        "speed": 1,
        "type": "electric",
        "usage": 720
      }
    },
    {
      "category": "buildings",
      "id": "quantum-chemical-plant",
      "name": "Quantum Chemical Plant",
      "row": 2,
      "stack": 30,
      "machine": {
        "drain": 36,
        "modules": 1,
        "speed": 2,
        "type": "electric",
        "usage": 2160
      }
    },
    {
      "category": "buildings",
      "id": "miniature-particle-collider",
      "name": "Miniature Particle Collider",
      "row": 2,
      "stack": 20,
      "machine": {
        "drain": 120,
        "modules": 1,
        "speed": 1,
        "type": "electric",
        "usage": 12000
      }
    },
    {
      "category": "buildings",
      "id": "arc-smelter",
      "name": "Arc Smelter",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 12,
        "modules": 1,
        "speed": 1,
        "type": "electric",
        "usage": 360
      }
    },
    {
      "category": "buildings",
      "id": "plane-smelter",
      "name": "Plane Smelter",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 48,
        "modules": 1,
        "speed": 2,
        "type": "electric",
        "usage": 1440
      }
    },
    {
      "category": "buildings",
      "id": "df-negentropy-smelter",
      "name": "Negentropy Smelter",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 96,
        "modules": 1,
        "speed": 3,
        "type": "electric",
        "usage": 2880
      }
    },
    {
      "category": "buildings",
      "id": "assembling-machine-1",
      "name": "Assembling Machine Mk.I",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 12,
        "modules": 1,
        "speed": 0.75,
        "type": "electric",
        "usage": 270
      }
    },
    {
      "category": "buildings",
      "id": "assembling-machine-2",
      "name": "Assembling Machine Mk.II",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 18,
        "modules": 1,
        "speed": 1,
        "type": "electric",
        "usage": 540
      }
    },
    {
      "category": "buildings",
      "id": "assembling-machine-3",
      "name": "Assembling Machine Mk.III",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 24,
        "modules": 1,
        "speed": 1.5,
        "type": "electric",
        "usage": 1080
      }
    },
    {
      "category": "buildings",
      "id": "df-recomposing-assembler",
      "name": "Re-composing Assembler",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 54,
        "modules": 1,
        "speed": 3,
        "type": "electric",
        "usage": 2700
      }
    },
    {
      "category": "buildings",
      "id": "matrix-lab",
      "name": "Matrix Lab",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 12,
        "modules": 1,
        "speed": 1,
        "type": "electric",
        "usage": 480
      }
    },
    {
      "category": "buildings",
      "id": "df-self-evolution-lab",
      "name": "Self-evolution Lab",
      "row": 3,
      "stack": 50,
      "machine": {
        "drain": 48,
        "modules": 1,
        "speed": 3,
        "type": "electric",
        "usage": 1920
      }
    },
    {
      "category": "buildings",
      "id": "holo-beacon",
      "name": "Holo Beacon",
      "row": 3,
      "stack": 50
    },
    {
      "category": "buildings",
      "id": "em-rail-ejector",
      "name": "EM-Rail Ejector",
      "row": 3,
      "stack": 30,
      "machine": {
        "drain": 60,
        "speed": 1,
        "type": "electric",
        "usage": 1800
      }
    },
    {
      "category": "buildings",
      "id": "vertical-launching-silo",
      "name": "Vertical Launching Silo",
      "row": 3,
      "stack": 10,
      "machine": {
        "drain": 60,
        "speed": 1,
        "type": "electric",
        "usage": 18000
      }
    },
    {
      "category": "buildings",
      "id": "df-gauss-turret",
      "name": "Gauss Turret",
      "row": 4,
      "stack": 50,
      "machine": {
        "drain": 9,
        "type": "electric",
        "usage": 210
      }
    },
    {
      "category": "buildings",
      "id": "df-missile-turret",
      "name": "Missile Turret",
      "row": 4,
      "stack": 50,
      "machine": {
        "drain": 18,
        "type": "electric",
        "usage": 600
      }
    },
    {
      "category": "buildings",
      "id": "df-implosion-cannon",
      "name": "Implosion Cannon",
      "row": 4,
      "stack": 50,
      "machine": {
        "drain": 30,
        "type": "electric",
        "usage": 750
      }
    },
    {
      "category": "buildings",
      "id": "df-laser-turret",
      "name": "Laser Turret",
      "row": 4,
      "stack": 50,
      "machine": {
        "drain": 120,
        "type": "electric",
        "usage": 3000
      }
    },
    {
      "category": "buildings",
      "id": "df-plasma-turret",
      "name": "Plasma Turret",
      "row": 4,
      "stack": 50,
      "machine": {
        "drain": 84,
        "type": "electric",
        "usage": 1680
      }
    },
    {
      "category": "buildings",
      "id": "df-plasma-turret-sr",
      "name": "SR Plasma Turret",
      "row": 4,
      "stack": 20,
      "machine": {
        "drain": 2100,
        "type": "electric",
        "usage": 4200
      }
    },
    {
      "category": "buildings",
      "id": "df-battlefield-analysis-base",
      "name": "Battlefield Analysis Base",
      "row": 4,
      "stack": 20,
      "machine": {
        "drain": 60,
        "type": "electric",
        "usage": 2400
      }
    },
    {
      "category": "buildings",
      "id": "df-jammer-tower",
      "name": "Jammer Tower",
      "row": 4,
      "stack": 50,
      "machine": {
        "drain": 90,
        "type": "electric",
        "usage": 1200
      }
    },
    {
      "category": "buildings",
      "id": "df-signal-tower",
      "name": "Signal Tower",
      "row": 4,
      "stack": 20,
      "machine": {
        "drain": 1350,
        "type": "electric",
        "usage": 9600
      }
    },
    {
      "category": "buildings",
      "id": "df-planetary-shield-generator",
      "name": "Planetary Shield Generator",
      "row": 4,
      "stack": 20,
      "machine": {
        "drain": 12000,
        "type": "electric",
        "usage": 24000
      }
    },
    {
      "category": "buildings-alt",
      "id": "ray-receiver-pro",
      "name": "Ray Receiver (Graviton lens)",
      "row": 0,
      "stack": 20,
      "machine": {
        "modules": 1,
        "speed": 1,
        "consumption": {
          "graviton-lens": 0.1
        }
      },
      "icon": "ray-receiver"
    },
    {
      "category": "components",
      "id": "iron-ore",
      "name": "Iron Ore",
      "row": 0,
      "stack": 100
    },
    {
      "category": "components",
      "id": "copper-ore",
      "name": "Copper Ore",
      "row": 0,
      "stack": 100
    },
    {
      "category": "components",
      "id": "stone",
      "name": "Stone",
      "row": 0,
      "stack": 100
    },
    {
      "category": "components",
      "id": "coal",
      "name": "Coal",
      "row": 0,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 2.7
      }
    },
    {
      "category": "components",
      "id": "silicon-ore",
      "name": "Silicon Ore",
      "row": 0,
      "stack": 100
    },
    {
      "category": "components",
      "id": "titanium-ore",
      "name": "Titanium Ore",
      "row": 0,
      "stack": 100
    },
    {
      "category": "components",
      "id": "water",
      "name": "Water",
      "row": 0,
      "stack": 20
    },
    {
      "category": "components",
      "id": "crude-oil",
      "name": "Crude Oil",
      "row": 0,
      "stack": 20,
      "fuel": {
        "category": "chemical",
        "value": 4.05
      }
    },
    {
      "category": "components",
      "id": "hydrogen",
      "name": "Hydrogen",
      "row": 0,
      "stack": 20,
      "fuel": {
        "category": "chemical",
        "value": 9
      }
    },
    {
      "category": "components",
      "id": "deuterium",
      "name": "Deuterium",
      "row": 0,
      "stack": 20,
      "fuel": {
        "category": "chemical",
        "value": 9
      }
    },
    {
      "category": "components",
      "id": "antimatter",
      "name": "Antimatter",
      "row": 0,
      "stack": 20
    },
    {
      "category": "components",
      "id": "df-core-element",
      "name": "Core Element",
      "row": 0,
      "stack": 50
    },
    {
      "category": "components",
      "id": "critical-photon",
      "name": "Critical Photon",
      "row": 0,
      "stack": 100
    },
    {
      "category": "components",
      "id": "kimberlite-ore",
      "name": "Kimberlite Ore",
      "row": 0,
      "stack": 50
    },
    {
      "category": "components",
      "id": "iron-ingot",
      "name": "Iron Ingot",
      "row": 1,
      "stack": 100
    },
    {
      "category": "components",
      "id": "copper-ingot",
      "name": "Copper Ingot",
      "row": 1,
      "stack": 100
    },
    {
      "category": "components",
      "id": "stone-brick",
      "name": "Stone Brick",
      "row": 1,
      "stack": 100
    },
    {
      "category": "components",
      "id": "energetic-graphite",
      "name": "Energetic Graphite",
      "row": 1,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 6.75
      }
    },
    {
      "category": "components",
      "id": "high-purity-silicon",
      "name": "High-purity Silicon",
      "row": 1,
      "stack": 100
    },
    {
      "category": "components",
      "id": "titanium-ingot",
      "name": "Titanium Ingot",
      "row": 1,
      "stack": 100
    },
    {
      "category": "components",
      "id": "sulfuric-acid",
      "name": "Sulfuric Acid",
      "row": 1,
      "stack": 20
    },
    {
      "category": "components",
      "id": "refined-oil",
      "name": "Refined Oil",
      "row": 1,
      "stack": 20,
      "fuel": {
        "category": "chemical",
        "value": 4.5
      }
    },
    {
      "category": "components",
      "id": "hydrogen-fuel-rod",
      "name": "Hydrogen Fuel Rod",
      "row": 1,
      "stack": 30,
      "fuel": {
        "category": "chemical",
        "value": 54
      }
    },
    {
      "category": "components",
      "id": "deuteron-fuel-rod",
      "name": "Deuteron Fuel Rod",
      "row": 1,
      "stack": 30,
      "fuel": {
        "category": "nuclear",
        "value": 600
      }
    },
    {
      "category": "components",
      "id": "antimatter-fuel-rod",
      "name": "Antimatter Fuel Rod",
      "row": 1,
      "stack": 30,
      "fuel": {
        "category": "antimatter",
        "value": 7200
      }
    },
    {
      "category": "components",
      "id": "df-strange-annihilation-fuel-rod",
      "name": "Strange Annihilation Fuel Rod",
      "row": 1,
      "stack": 50,
      "fuel": {
        "category": "antimatter",
        "value": 72000
      }
    },
    {
      "category": "components",
      "id": "df-missile-set",
      "name": "Missile Set",
      "row": 1,
      "stack": 100
    },
    {
      "category": "components",
      "id": "fractal-silicon",
      "name": "Fractal Silicon",
      "row": 1,
      "stack": 50
    },
    {
      "category": "components",
      "id": "magnet",
      "name": "Magnet",
      "row": 2,
      "stack": 200
    },
    {
      "category": "components",
      "id": "magnetic-coil",
      "name": "Magnetic Coil",
      "row": 2,
      "stack": 200
    },
    {
      "category": "components",
      "id": "glass",
      "name": "Glass",
      "row": 2,
      "stack": 100
    },
    {
      "category": "components",
      "id": "diamond",
      "name": "Diamond",
      "row": 2,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 0.9
      }
    },
    {
      "category": "components",
      "id": "crystal-silicon",
      "name": "Crystal Silicon",
      "row": 2,
      "stack": 100
    },
    {
      "category": "components",
      "id": "titanium-alloy",
      "name": "Titanium Alloy",
      "row": 2,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-combustible-unit",
      "name": "Combustible Unit",
      "row": 2,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 9.72
      }
    },
    {
      "category": "components",
      "id": "plastic",
      "name": "Plastic",
      "row": 2,
      "stack": 100
    },
    {
      "category": "components",
      "id": "organic-crystal",
      "name": "Organic Crystal",
      "row": 2,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 1.8
      }
    },
    {
      "category": "components",
      "id": "graphene",
      "name": "Graphene",
      "row": 2,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 0.096
      }
    },
    {
      "category": "components",
      "id": "annihilation-constraint-sphere",
      "name": "Annihilation Constraint Sphere",
      "row": 2,
      "stack": 20
    },
    {
      "category": "components",
      "id": "df-magnum-ammo-box",
      "name": "Magnum Ammo Box",
      "row": 2,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-supersonic-missile-set",
      "name": "Supersonic Missile Set",
      "row": 2,
      "stack": 100
    },
    {
      "category": "components",
      "id": "optical-grating-crystal",
      "name": "Grating Crystal",
      "row": 2,
      "stack": 50
    },
    {
      "category": "components",
      "id": "steel",
      "name": "Steel",
      "row": 3,
      "stack": 100
    },
    {
      "category": "components",
      "id": "circuit-board",
      "name": "Circuit Board",
      "row": 3,
      "stack": 200
    },
    {
      "category": "components",
      "id": "prism",
      "name": "Prism",
      "row": 3,
      "stack": 100
    },
    {
      "category": "components",
      "id": "electric-motor",
      "name": "Electric Motor",
      "row": 3,
      "stack": 100
    },
    {
      "category": "components",
      "id": "microcrystalline-component",
      "name": "Microcrystalline Component",
      "row": 3,
      "stack": 200
    },
    {
      "category": "components",
      "id": "proliferator-1",
      "name": "Proliferator Mk.I",
      "row": 3,
      "stack": 200,
      "fuel": {
        "category": "chemical",
        "value": 3.24
      }
    },
    {
      "category": "components",
      "id": "df-explosive-unit",
      "name": "Explosive Unit",
      "row": 3,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 21.6
      }
    },
    {
      "category": "components",
      "id": "strange-matter",
      "name": "Strange Matter",
      "row": 3,
      "stack": 100
    },
    {
      "category": "components",
      "id": "titanium-crystal",
      "name": "Titanium Crystal",
      "row": 3,
      "stack": 100
    },
    {
      "category": "components",
      "id": "carbon-nanotube",
      "name": "Carbon Nanotube",
      "row": 3,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 0.084
      }
    },
    {
      "category": "components",
      "id": "particle-broadband",
      "name": "Particle Broadband",
      "row": 3,
      "stack": 200
    },
    {
      "category": "components",
      "id": "df-titanium-ammo-box",
      "name": "Titanium Ammo Box",
      "row": 3,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-gravity-missile-set",
      "name": "Gravity Missile Set",
      "row": 3,
      "stack": 100
    },
    {
      "category": "components",
      "id": "spiniform-stalagmite-crystal",
      "name": "Stalagmite Crystal",
      "row": 3,
      "stack": 50
    },
    {
      "category": "components",
      "id": "gear",
      "name": "Gear",
      "row": 4,
      "stack": 200
    },
    {
      "category": "components",
      "id": "plasma-exciter",
      "name": "Plasma Exciter",
      "row": 4,
      "stack": 200
    },
    {
      "category": "components",
      "id": "photon-combiner",
      "name": "Photon Combiner",
      "row": 4,
      "stack": 200
    },
    {
      "category": "components",
      "id": "electromagnetic-turbine",
      "name": "Electromagnetic Turbine",
      "row": 4,
      "stack": 100
    },
    {
      "category": "components",
      "id": "processor",
      "name": "Processor",
      "row": 4,
      "stack": 200
    },
    {
      "category": "components",
      "id": "proliferator-2",
      "name": "Proliferator Mk.II",
      "row": 4,
      "stack": 200,
      "fuel": {
        "category": "chemical",
        "value": 8.856
      }
    },
    {
      "category": "components",
      "id": "df-crystal-explosive-unit",
      "name": "Crystal Explosive Unit",
      "row": 4,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 54
      }
    },
    {
      "category": "components",
      "id": "casimir-crystal",
      "name": "Casimir Crystal",
      "row": 4,
      "stack": 100
    },
    {
      "category": "components",
      "id": "titanium-glass",
      "name": "Titanium Glass",
      "row": 4,
      "stack": 100
    },
    {
      "category": "components",
      "id": "plane-filter",
      "name": "Plane Filter",
      "row": 4,
      "stack": 200
    },
    {
      "category": "components",
      "id": "quantum-chip",
      "name": "Quantum Chip",
      "row": 4,
      "stack": 200
    },
    {
      "category": "components",
      "id": "df-superalloy-ammo-box",
      "name": "Superalloy Ammo Box",
      "row": 4,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-shell-set",
      "name": "Shell Set",
      "row": 4,
      "stack": 100
    },
    {
      "category": "components",
      "id": "unipolar-magnet",
      "name": "Unipolar Magnet",
      "row": 4,
      "stack": 50
    },
    {
      "category": "components",
      "id": "df-engine",
      "name": "Engine",
      "row": 5,
      "stack": 200
    },
    {
      "category": "components",
      "id": "thruster",
      "name": "Thruster",
      "row": 5,
      "stack": 200
    },
    {
      "category": "components",
      "id": "reinforced-thruster",
      "name": "Reinforced Thruster",
      "row": 5,
      "stack": 100
    },
    {
      "category": "components",
      "id": "super-magnetic-ring",
      "name": "Super-magnetic Ring",
      "row": 5,
      "stack": 100
    },
    {
      "category": "components",
      "id": "particle-container",
      "name": "Particle Container",
      "row": 5,
      "stack": 100
    },
    {
      "category": "components",
      "id": "proliferator-3",
      "name": "Proliferator Mk.III",
      "row": 5,
      "stack": 200,
      "fuel": {
        "category": "chemical",
        "value": 21.255
      }
    },
    {
      "category": "components",
      "id": "df-prototype",
      "name": "Prototype",
      "row": 5,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-precision-drone",
      "name": "Precision Drone",
      "row": 5,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-attack-drone",
      "name": "Attack Drone",
      "row": 5,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-corvette",
      "name": "Corvette",
      "row": 5,
      "stack": 50
    },
    {
      "category": "components",
      "id": "df-destroyer",
      "name": "Destroyer",
      "row": 5,
      "stack": 50
    },
    {
      "category": "components",
      "id": "df-plasma-capsule",
      "name": "Plasma Capsule",
      "row": 5,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-high-explosive-shell-set",
      "name": "High-Explosive Shell Set",
      "row": 5,
      "stack": 100
    },
    {
      "category": "components",
      "id": "fire-ice",
      "name": "Fire Ice",
      "row": 5,
      "stack": 50,
      "fuel": {
        "category": "chemical",
        "value": 4.8
      }
    },
    {
      "category": "components",
      "id": "logistics-bot",
      "name": "Logistics Bot",
      "row": 6,
      "stack": 200
    },
    {
      "category": "components",
      "id": "logistics-drone",
      "name": "Logistics Drone",
      "row": 6,
      "stack": 200
    },
    {
      "category": "components",
      "id": "logistics-vessel",
      "name": "Interstellar Logistics Vessel",
      "row": 6,
      "stack": 50
    },
    {
      "category": "components",
      "id": "space-warper",
      "name": "Space Warper",
      "row": 6,
      "stack": 100
    },
    {
      "category": "components",
      "id": "graviton-lens",
      "name": "Graviton Lens",
      "row": 6,
      "stack": 100,
      "fuel": {
        "category": "lens",
        "value": 1
      }
    },
    {
      "category": "components",
      "id": "foundation",
      "name": "Foundation",
      "row": 6,
      "stack": 1000
    },
    {
      "category": "components",
      "id": "solar-sail",
      "name": "Solar Sail",
      "row": 6,
      "stack": 200
    },
    {
      "category": "components",
      "id": "frame-material",
      "name": "Frame Material",
      "row": 6,
      "stack": 100
    },
    {
      "category": "components",
      "id": "dyson-sphere-component",
      "name": "Dyson Sphere Component",
      "row": 6,
      "stack": 100
    },
    {
      "category": "components",
      "id": "small-carrier-rocket",
      "name": "Small Carrier Rocket",
      "row": 6,
      "stack": 20
    },
    {
      "category": "components",
      "id": "df-antimatter-capsule",
      "name": "Antimatter Capsule",
      "row": 6,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-crystal-shell-set",
      "name": "Crystal Shell Set",
      "row": 6,
      "stack": 100
    },
    {
      "category": "components",
      "id": "log",
      "name": "Log",
      "row": 6,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 1.5
      }
    },
    {
      "category": "components",
      "id": "electromagnetic-matrix",
      "name": "Electromagnetic Matrix",
      "row": 7,
      "stack": 200
    },
    {
      "category": "components",
      "id": "energy-matrix",
      "name": "Energy Matrix",
      "row": 7,
      "stack": 200
    },
    {
      "category": "components",
      "id": "structure-matrix",
      "name": "Structure Matrix",
      "row": 7,
      "stack": 200
    },
    {
      "category": "components",
      "id": "information-matrix",
      "name": "Information Matrix",
      "row": 7,
      "stack": 200
    },
    {
      "category": "components",
      "id": "gravity-matrix",
      "name": "Gravity Matrix",
      "row": 7,
      "stack": 200
    },
    {
      "category": "components",
      "id": "universe-matrix",
      "name": "Universe Matrix",
      "row": 7,
      "stack": 200
    },
    {
      "category": "components",
      "id": "df-dark-fog-matrix",
      "name": "Dark Fog Matrix",
      "row": 7,
      "stack": 200
    },
    {
      "category": "components",
      "id": "df-energy-shard",
      "name": "Energy Shard",
      "row": 7,
      "stack": 100,
      "fuel": {
        "category": "chemical",
        "value": 3.6
      }
    },
    {
      "category": "components",
      "id": "df-silicon-based-neuron",
      "name": "Silicon-based Neuron",
      "row": 7,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-negentropy-singularity",
      "name": "Negentropy Singularity",
      "row": 7,
      "stack": 50
    },
    {
      "category": "components",
      "id": "df-matter-recombinator",
      "name": "Matter Recombinator",
      "row": 7,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-jamming-capsule",
      "name": "Jamming Capsule",
      "row": 7,
      "stack": 100
    },
    {
      "category": "components",
      "id": "df-suppressing-capsule",
      "name": "Suppressing Capsule",
      "row": 7,
      "stack": 100
    },
    {
      "category": "components",
      "id": "plant-fuel",
      "name": "Plant Fuel",
      "row": 7,
      "stack": 500,
      "fuel": {
        "category": "chemical",
        "value": 0.5
      }
    },
    {
      "category": "effects",
      "id": "proliferator-1-products",
      "name": "Proliferator Mk.I (Products)",
      "module": {
        "consumption": 0.3,
        "limitation": "productivity",
        "productivity": 0.125,
        "proliferator": "proliferator-1",
        "sprays": 12
      }
    },
    {
      "category": "effects",
      "id": "proliferator-2-products",
      "name": "Proliferator Mk.II (Products)",
      "module": {
        "consumption": 0.7,
        "limitation": "productivity",
        "productivity": 0.2,
        "proliferator": "proliferator-2",
        "sprays": 24
      }
    },
    {
      "category": "effects",
      "id": "proliferator-3-products",
      "name": "Proliferator Mk.III (Products)",
      "module": {
        "consumption": 1.5,
        "limitation": "productivity",
        "productivity": 0.25,
        "proliferator": "proliferator-3",
        "sprays": 60
      }
    },
    {
      "category": "effects",
      "id": "proliferator-1-speed",
      "name": "Proliferator Mk.I (Speedup)",
      "module": {
        "consumption": 0.3,
        "proliferator": "proliferator-1",
        "speed": 0.25,
        "sprays": 12
      }
    },
    {
      "category": "effects",
      "id": "proliferator-2-speed",
      "name": "Proliferator Mk.II (Speedup)",
      "module": {
        "consumption": 0.7,
        "proliferator": "proliferator-2",
        "speed": 0.5,
        "sprays": 24
      }
    },
    {
      "category": "effects",
      "id": "proliferator-3-speed",
      "name": "Proliferator Mk.III (Speedup)",
      "module": {
        "consumption": 1.5,
        "proliferator": "proliferator-3",
        "speed": 1,
        "sprays": 60
      }
    }
  ],
  "productivity": [
    "accumulator",
    "accumulator-full",
    "advanced-mining-machine",
    "annihilation-constraint-sphere",
    "applied-superconductor",
    "arc-smelter",
    "artificial-star",
    "artificial-star-technology",
    "assembling-machine-1",
    "automatic-metallurgy",
    "automatic-piler",
    "basic-assembling-processes",
    "basic-chemical-engineering",
    "basic-logistics-system",
    "carbon-nanotube",
    "carbon-nanotube-advanced",
    "casimir-crystal",
    "casimir-crystal-advanced",
    "casimir-crystal-technology",
    "chemical-plant",
    "circuit-board",
    "coal-vein",
    "communication-control-1",
    "communication-control-2",
    "communication-control-3",
    "communication-control-4",
    "communication-control-5",
    "communication-control-6",
    "communication-control-7",
    "controlled-annihilation-reaction",
    "conveyor-belt-1",
    "copper-ingot",
    "copper-vein",
    "crude-oil-seep",
    "crystal-silicon",
    "crystal-silicon-advanced",
    "crystal-smelting",
    "deuterium-fractionation-technology",
    "deuteron-fuel-rod",
    "df-antimatter-capsule",
    "df-antimatter-capsule-tech",
    "df-attack-drone",
    "df-attack-drone-tech",
    "df-auto-reconstruction-marking-1",
    "df-auto-reconstruction-marking-2",
    "df-auto-reconstruction-marking-3",
    "df-auto-reconstruction-marking-4",
    "df-auto-reconstruction-marking-5",
    "df-auto-reconstruction-marking-6",
    "df-battlefield-analysis-base",
    "df-battlefield-analysis-base-tech",
    "df-combat-drone-attack-speed-1",
    "df-combat-drone-attack-speed-2",
    "df-combat-drone-attack-speed-3",
    "df-combat-drone-attack-speed-4",
    "df-combat-drone-attack-speed-5",
    "df-combat-drone-damage-1",
    "df-combat-drone-damage-2",
    "df-combat-drone-damage-3",
    "df-combat-drone-damage-4",
    "df-combat-drone-damage-5",
    "df-combat-drone-durability-1",
    "df-combat-drone-durability-2",
    "df-combat-drone-durability-3",
    "df-combat-drone-durability-4",
    "df-combat-drone-durability-5",
    "df-combustible-unit",
    "df-combustible-unit-tech",
    "df-corvette",
    "df-corvette-tech",
    "df-crystal-explosive-unit",
    "df-crystal-explosive-unit-tech",
    "df-crystal-shell-set",
    "df-crystal-shell-set-tech",
    "df-destroyer",
    "df-destroyer-tech",
    "df-digital-analog-computation",
    "df-em-weapon-strength-1",
    "df-em-weapon-strength-2",
    "df-em-weapon-strength-3",
    "df-em-weapon-strength-4",
    "df-em-weapon-strength-5",
    "df-em-weapon-strength-6",
    "df-energy-shield-1",
    "df-energy-shield-2",
    "df-energy-shield-3",
    "df-energy-shield-4",
    "df-energy-shield-5",
    "df-energy-shield-6",
    "df-energy-shield-7",
    "df-energy-weapon-damage-1",
    "df-energy-weapon-damage-2",
    "df-energy-weapon-damage-3",
    "df-energy-weapon-damage-4",
    "df-energy-weapon-damage-5",
    "df-energy-weapon-damage-6",
    "df-engine",
    "df-engine-tech",
    "df-enhanced-structure-1",
    "df-enhanced-structure-2",
    "df-enhanced-structure-3",
    "df-enhanced-structure-4",
    "df-enhanced-structure-5",
    "df-enhanced-structure-6",
    "df-explosive-unit",
    "df-explosive-unit-tech",
    "df-explosive-weapon-damage-1",
    "df-explosive-weapon-damage-2",
    "df-explosive-weapon-damage-3",
    "df-explosive-weapon-damage-4",
    "df-explosive-weapon-damage-5",
    "df-explosive-weapon-damage-6",
    "df-gauss-turret",
    "df-gravity-missile-set",
    "df-gravity-missile-set-tech",
    "df-ground-squadron-expansion-1",
    "df-ground-squadron-expansion-2",
    "df-ground-squadron-expansion-3",
    "df-ground-squadron-expansion-4",
    "df-ground-squadron-expansion-5",
    "df-ground-squadron-expansion-6",
    "df-ground-squadron-expansion-7",
    "df-high-density-controlled-annihilation",
    "df-high-explosive-shell-set",
    "df-high-explosive-shell-set-tech",
    "df-implosion-cannon",
    "df-implosion-cannon-tech",
    "df-jammer-tower",
    "df-jammer-tower-tech",
    "df-jamming-capsule",
    "df-kinetic-weapon-damage-1",
    "df-kinetic-weapon-damage-2",
    "df-kinetic-weapon-damage-3",
    "df-kinetic-weapon-damage-4",
    "df-kinetic-weapon-damage-5",
    "df-kinetic-weapon-damage-6",
    "df-laser-turret",
    "df-magnum-ammo-box",
    "df-matter-recombination",
    "df-missile-set",
    "df-missile-turret",
    "df-missile-turret-tech",
    "df-negentropy-recursion",
    "df-planetary-defense-system",
    "df-planetary-shield-1",
    "df-planetary-shield-2",
    "df-planetary-shield-3",
    "df-planetary-shield-4",
    "df-planetary-shield-5",
    "df-planetary-shield-generator",
    "df-plasma-capsule",
    "df-plasma-turret",
    "df-plasma-turret-sr",
    "df-plasma-turret-tech",
    "df-precision-drone",
    "df-precision-drone-tech",
    "df-prototype",
    "df-prototype-tech",
    "df-shell-set",
    "df-signal-tower-tech",
    "df-space-fleet-expansion-1",
    "df-space-fleet-expansion-2",
    "df-space-fleet-expansion-3",
    "df-space-fleet-expansion-4",
    "df-space-fleet-expansion-5",
    "df-space-fleet-expansion-6",
    "df-space-fleet-expansion-7",
    "df-superalloy-ammo-box",
    "df-superalloy-ammo-box-tech",
    "df-supersonic-missile-set",
    "df-supersonic-missile-set-tech",
    "df-suppressing-capsule",
    "df-suppressing-capsule-tech",
    "df-titanium-ammo-box",
    "df-titanium-ammo-box-tech",
    "df-weapon-system",
    "diamond",
    "diamond-advanced",
    "dirac-inversion-mechanism",
    "distribution-logistics-system",
    "distribution-range-1",
    "distribution-range-2",
    "distribution-range-3",
    "distribution-range-4",
    "distribution-range-5",
    "drive-engine-1",
    "drive-engine-2",
    "drive-engine-3",
    "drive-engine-4",
    "drive-engine-5",
    "drive-engine-6",
    "drone-engine-1",
    "drone-engine-2",
    "drone-engine-3",
    "drone-engine-4",
    "drone-engine-5",
    "drone-engine-6",
    "dyson-sphere-component",
    "dyson-sphere-stress-system-1",
    "electric-motor",
    "electromagnetic-drive",
    "electromagnetic-matrix",
    "electromagnetic-matrix-technology",
    "electromagnetic-turbine",
    "electromagnetism",
    "em-rail-ejector",
    "energetic-graphite",
    "energy-circuit-1",
    "energy-circuit-2",
    "energy-circuit-3",
    "energy-circuit-4",
    "energy-circuit-5",
    "energy-circuit-6",
    "energy-exchanger",
    "energy-matrix",
    "energy-matrix-technology",
    "energy-storage",
    "environment-modification",
    "fire-ice-vein",
    "fluid-storage-encapsulation",
    "foundation",
    "fractal-silicon-vein",
    "fractionator",
    "frame-material",
    "gas-giant",
    "gas-giant-deuterium",
    "gas-giant-hydrogen",
    "gas-giants-exploitation",
    "gear",
    "geothermal-extraction",
    "geothermal-power-station",
    "glass",
    "graphene",
    "graphene-advanced",
    "gravitational-wave-refraction",
    "graviton-lens",
    "gravity-matrix",
    "gravity-matrix-technology",
    "high-efficiency-logistics-system",
    "high-efficiency-plasma-control",
    "high-purity-silicon",
    "high-speed-assembling-processes",
    "high-strength-crystal",
    "high-strength-glass",
    "high-strength-lightweight-structure",
    "high-strength-material",
    "high-strength-titanium-alloy",
    "hydrogen-fuel-rod",
    "hydrogen-fuel-rod-technology",
    "ice-giant",
    "ice-giant-gas-hydrate",
    "ice-giant-hydrogen",
    "improved-logistics-system",
    "information-matrix",
    "information-matrix-technology",
    "integrated-logistics-system",
    "interstellar-logistics-system",
    "interstellar-power-transmission",
    "inventory-capacity-1",
    "inventory-capacity-2",
    "inventory-capacity-3",
    "inventory-capacity-4",
    "inventory-capacity-5",
    "inventory-capacity-6",
    "inventory-capacity-7",
    "iron-ingot",
    "iron-vein",
    "kimberlite-vein",
    "logistics-bot",
    "logistics-carrier-capacity-1",
    "logistics-carrier-capacity-12",
    "logistics-carrier-capacity-2",
    "logistics-carrier-capacity-3",
    "logistics-carrier-capacity-4",
    "logistics-carrier-capacity-5",
    "logistics-carrier-capacity-6",
    "logistics-carrier-capacity-7",
    "logistics-carrier-capacity-8",
    "logistics-carrier-capacity-9",
    "logistics-carrier-engine-1",
    "logistics-carrier-engine-2",
    "logistics-carrier-engine-3",
    "logistics-carrier-engine-4",
    "logistics-carrier-engine-5",
    "logistics-carrier-engine-6",
    "logistics-carrier-engine-7",
    "logistics-distributor",
    "logistics-drone",
    "logistics-station-integrated-logistics-1",
    "logistics-station-integrated-logistics-2",
    "logistics-station-integrated-logistics-3",
    "logistics-vessel",
    "magnet",
    "magnetic-coil",
    "magnetic-levitation-technology",
    "magnetic-particle-trap",
    "mass-construction-1",
    "mass-construction-2",
    "mass-construction-3",
    "mass-construction-4",
    "mass-construction-5",
    "matrix-lab",
    "mecha-core-1",
    "mecha-core-2",
    "mecha-core-3",
    "mecha-core-4",
    "mecha-core-5",
    "mecha-core-6",
    "mechanical-frame-1",
    "mechanical-frame-2",
    "mechanical-frame-3",
    "mechanical-frame-4",
    "mechanical-frame-5",
    "mechanical-frame-6",
    "mechanical-frame-7",
    "mechanical-frame-8",
    "mesoscopic-quantum-entanglement",
    "microcrystalline-component",
    "mini-fusion-power-generation",
    "mini-fusion-power-plant",
    "miniature-particle-collider",
    "miniature-particle-collider-technology",
    "mining-machine",
    "mission-completed",
    "ocean",
    "oil-extractor",
    "oil-refinery",
    "optical-grating-crystal-vein",
    "organic-crystal",
    "organic-crystal-original",
    "organic-crystal-vein",
    "particle-broadband",
    "particle-container",
    "particle-container-advanced",
    "particle-control-technology",
    "photon-combiner",
    "photon-combiner-advanced",
    "photon-frequency-conversion",
    "photon-spotlight-mining-technology",
    "pile-sorter-1",
    "pile-sorter-2",
    "pile-sorter-3",
    "pile-sorter-4",
    "pile-sorter-5",
    "pile-sorter-6",
    "plane-filter",
    "plane-filter-smelting-technology",
    "planetary-ionosphere-utilization",
    "planetary-logistics-station",
    "planetary-logistics-system",
    "plasma-exciter",
    "plasma-extract-refining",
    "plasma-refining",
    "plastic",
    "polymer-chemical-engineering",
    "prism",
    "processor",
    "processor-technology",
    "proliferator-1",
    "proliferator-1-technology",
    "proliferator-2",
    "proliferator-2-technology",
    "proliferator-3",
    "proliferator-3-technology",
    "quantum-chip",
    "quantum-chip-technology",
    "quantum-printing-technology",
    "ray-receiver",
    "ray-receiver-technology",
    "ray-transmission-efficiency-1",
    "ray-transmission-efficiency-2",
    "ray-transmission-efficiency-3",
    "ray-transmission-efficiency-4",
    "ray-transmission-efficiency-5",
    "ray-transmission-efficiency-6",
    "ray-transmission-efficiency-7",
    "ray-transmission-efficiency-8",
    "reforming-refine-technology",
    "reinforced-thruster",
    "reinforced-thruster-technology",
    "research-speed-1",
    "research-speed-2",
    "research-speed-3",
    "research-speed-4",
    "satellite-power-distribution-system",
    "semiconductor-material",
    "silicium-vein",
    "silicon-ore",
    "small-carrier-rocket",
    "smelting-purification",
    "solar-collection",
    "solar-panel",
    "solar-sail",
    "solar-sail-life-1",
    "solar-sail-life-2",
    "solar-sail-life-3",
    "solar-sail-life-4",
    "solar-sail-life-5",
    "solar-sail-life-6",
    "solar-sail-orbit-system",
    "sorter-1",
    "sorter-cargo-integration",
    "sorter-cargo-stacking-1",
    "sorter-cargo-stacking-2",
    "sorter-cargo-stacking-3",
    "sorter-cargo-stacking-4",
    "sorter-cargo-stacking-5",
    "space-warper",
    "space-warper-advanced",
    "spiniform-stalagmite-crystal-vein",
    "splitter",
    "spray-coater",
    "steel",
    "steel-smelting",
    "stone-brick",
    "stone-vein",
    "storage-1",
    "storage-2",
    "storage-tank",
    "strange-matter",
    "strange-matter-technology",
    "structure-matrix",
    "structure-matrix-technology",
    "sulfuric-acid",
    "sulphuric-acid-vein",
    "super-magnetic-field-generator",
    "super-magnetic-ring",
    "tesla-tower",
    "thermal-power",
    "thermal-power-plant",
    "thruster",
    "thruster-technology",
    "titanium-alloy",
    "titanium-crystal",
    "titanium-glass",
    "titanium-ingot",
    "titanium-smelting",
    "titanium-vein",
    "traffic-monitor",
    "unipolar-magnet-vein",
    "universe-exploration-1",
    "universe-exploration-2",
    "universe-exploration-3",
    "universe-exploration-4",
    "universe-matrix",
    "universe-matrix-technology",
    "veins-utilization-1",
    "veins-utilization-2",
    "veins-utilization-3",
    "veins-utilization-4",
    "veins-utilization-5",
    "veins-utilization-6",
    "vertical-construction-1",
    "vertical-construction-2",
    "vertical-construction-3",
    "vertical-construction-4",
    "vertical-construction-5",
    "vertical-construction-6",
    "vertical-launching-silo",
    "vertical-launching-silo-technology",
    "water-pump",
    "wave-function-interference",
    "wind-turbine",
    "x-ray-cracking-technology"
  ]
};
