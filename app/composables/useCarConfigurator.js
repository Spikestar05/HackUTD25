export const useCarConfigurator = () => {
  const activeSection = useState('activeSection', () => null)
  const activeTab = useState('configActiveTab', () => 'model')
  const activeField = useState('configActiveField', () => 'engine')
  const allVehicles = useState('allVehicles', () => [])
  const selections = useState('selections', () => ({
    model: null,
    trim: null,
    engine: null,
    transmission: null,
    driveTrain: null,
    exteriorColor: null,
    interiorColor: null,
    wheels: null
  }))

  // Fetch all vehicles from API
  const fetchVehicles = async () => {
    try {
      const { data } = await useFetch('/api/vehicles')
      if (data.value?.success) {
        allVehicles.value = data.value.data
      }
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
    }
  }

  // Get filtered vehicles based on current selections
  const getFilteredVehicles = (excludeField = null) => {
    let filtered = [...allVehicles.value]
    
    if (excludeField !== 'model' && selections.value.model) {
      filtered = filtered.filter(v => v.Model === selections.value.model)
    }
    if (excludeField !== 'trim' && selections.value.trim) {
      filtered = filtered.filter(v => v.Trim === selections.value.trim)
    }
    if (excludeField !== 'engine' && selections.value.engine) {
      filtered = filtered.filter(v => v.Engine === selections.value.engine)
    }
    if (excludeField !== 'transmission' && selections.value.transmission) {
      filtered = filtered.filter(v => v.Transmission === selections.value.transmission)
    }
    if (excludeField !== 'driveTrain' && selections.value.driveTrain) {
      filtered = filtered.filter(v => v.DriveTrain === selections.value.driveTrain)
    }
    
    return filtered
  }

  // Get unique values for a field
  const getUniqueValues = (field, excludeField = null) => {
    const vehicles = getFilteredVehicles(excludeField)
    const values = vehicles.map(v => {
      switch(field) {
        case 'model': return v.Model
        case 'trim': return v.Trim
        case 'engine': return v.Engine
        case 'transmission': return v.Transmission
        case 'driveTrain': return v.DriveTrain
        case 'exteriorColor': return v['Exterior Colors']
        case 'interiorColor': return v['Interior Colors']
        case 'wheels': return v.Wheels
        default: return null
      }
    }).filter(Boolean)
    
    return [...new Set(values)]
  }

  // Check if an option is available based on current selections
  const isOptionAvailable = (field, value) => {
    const availableOptions = getUniqueValues(field, field)
    return availableOptions.includes(value)
  }

  // Available options (computed-like)
  const availableModels = computed(() => getUniqueValues('model', 'model'))
  const availableTrims = computed(() => getUniqueValues('trim', 'trim'))
  const availableInteriorColors = computed(() => getUniqueValues('interiorColor', 'interiorColor'))
  const availableExteriorColors = computed(() => getUniqueValues('exteriorColor', 'exteriorColor'))
  const availableTransmissions = computed(() => getUniqueValues('transmission', 'transmission'))
  const availableDriveTrains = computed(() => getUniqueValues('driveTrain', 'driveTrain'))
  const availableWheels = computed(() => getUniqueValues('wheels', 'wheels'))
  
  // Available engines with fuel type and MPG
  const availableEngines = computed(() => {
    const vehicles = getFilteredVehicles('engine')
    const engineMap = new Map()
    
    vehicles.forEach(v => {
      if (!engineMap.has(v.Engine)) {
        engineMap.set(v.Engine, {
          name: v.Engine,
          fuelType: v['Fuel Type'],
          mpg: v.MPG
        })
      }
    })
    
    return Array.from(engineMap.values())
  })

  // Toggle section
  const toggleSection = (section) => {
    activeSection.value = activeSection.value === section ? null : section
  }

  // Select option with cascade clearing and tab progression
  const selectOption = (field, value) => {
    // If clicking the same value, unselect it
    if (selections.value[field] === value) {
      selections.value[field] = null
      
      // Cascade clear dependent fields
      if (field === 'model') {
        selections.value.trim = null
        selections.value.engine = null
        selections.value.transmission = null
        selections.value.driveTrain = null
        selections.value.exteriorColor = null
        selections.value.interiorColor = null
        selections.value.wheels = null
      } else if (field === 'trim') {
        selections.value.engine = null
        selections.value.transmission = null
        selections.value.driveTrain = null
        selections.value.exteriorColor = null
        selections.value.interiorColor = null
        selections.value.wheels = null
      } else if (field === 'engine') {
        selections.value.transmission = null
        selections.value.driveTrain = null
      }
    } else {
      selections.value[field] = value
    }
      // Progress to next tab after selection
  }

  // Get CSS classes for button options
  const getOptionClasses = (field, value) => {
    const isSelected = selections.value[field] === value
    const isAvailable = isOptionAvailable(field, value)
    
    return [
    'w-full text-left p-4 rounded-lg border transition-all',
    isSelected
        ? 'border-red-600 bg-red-100 text-red-800'
        : !isAvailable
        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
        : 'border-gray-300 hover:border-red-600 hover:bg-red-100 hover:text-red-800'
    ]
  }

  // Get CSS classes for radio button options (powertrain)
  const getRadioOptionClasses = (field, value) => {
    const isSelected = selections.value[field] === value
    const isAvailable = isOptionAvailable(field, value)
    
    return [
    'w-full text-left p-4 rounded-lg border transition-all',
    isSelected
        ? 'border-red-600 bg-red-100 text-red-800'
        : !isAvailable
        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
        : 'border-gray-300 hover:border-red-600 hover:bg-red-100 hover:text-red-800'
    ]

  }

  // Initialize data on mount
  onMounted(() => {
    fetchVehicles()
  })

  return {
    activeSection,
    activeTab,
    selections,
    allVehicles,
    availableModels,
    availableTrims,
    availableEngines,
    availableTransmissions,
    availableDriveTrains,
    availableInteriorColors,
    availableExteriorColors,
    availableWheels,
    toggleSection,
    selectOption,
    isOptionAvailable,
    getOptionClasses,
    getRadioOptionClasses,
    fetchVehicles
  }
}
