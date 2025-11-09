<template>
    <div class="p-6 space-y-6 text-white">
      <!-- Finance Type Toggle -->
      <div class="flex gap-2 p-1 bg-gray-800 rounded-lg">
        <button
          @click="financeType = 'loan'"
          class="flex-1 py-3 rounded-md transition-all text-sm font-medium"
          :class="financeType === 'loan' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'"
        >
          Finance
        </button>
        <button
          @click="financeType = 'lease'"
          class="flex-1 py-3 rounded-md transition-all text-sm font-medium"
          :class="financeType === 'lease' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'"
        >
          Lease
        </button>
      </div>
  
      <!-- Finance Calculator -->
      <div v-if="financeType === 'loan'" class="space-y-4">
        <h3 class="text-lg font-semibold">Loan Calculator</h3>
        
        <div class="space-y-4">
          <!-- Vehicle Price -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Vehicle Price</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                v-model.number="loanInputs.vehiclePrice"
                type="number"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:border-red-600"
                placeholder="45000"
              />
            </div>
          </div>
  
          <!-- Down Payment -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Down Payment</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                v-model.number="loanInputs.downPayment"
                type="number"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:border-red-600"
                placeholder="5000"
              />
            </div>
          </div>
  
          <!-- Trade-in Value -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Trade-in Value</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                v-model.number="loanInputs.tradeIn"
                type="number"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:border-red-600"
                placeholder="0"
              />
            </div>
          </div>
  
          <!-- Incentives -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Incentives / Rebates</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                v-model.number="loanInputs.incentives"
                type="number"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:border-red-600"
                placeholder="0"
              />
            </div>
          </div>
  
          <!-- Credit Score -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Credit Score</label>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="score in creditScoreRanges"
                :key="score.value"
                @click="loanInputs.creditScore = score.value"
                class="flex-1 min-w-[100px] py-3 px-2 rounded-lg transition-all text-xs font-medium"
                :class="loanInputs.creditScore === score.value ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
              >
                {{ score.label }}
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-2">
              Estimated APR: {{ loanAPR.toFixed(2) }}%
            </p>
          </div>
  
          <!-- Loan Term -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Loan Term</label>
            <div class="flex gap-2">
              <button
                v-for="term in [36, 48, 60, 72]"
                :key="term"
                @click="loanInputs.termMonths = term"
                class="flex-1 py-3 rounded-lg transition-all text-sm font-medium"
                :class="loanInputs.termMonths === term ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
              >
                {{ term }} mo
              </button>
            </div>
          </div>
        </div>
  
        <!-- Loan Result -->
        <div class="mt-6 p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-xl border border-red-600/30">
          <div class="text-sm text-gray-400 mb-2">Estimated Monthly Payment</div>
          <div class="text-4xl font-bold text-white mb-4">
            ${{ loanMonthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div class="text-gray-400">Loan Amount</div>
              <div class="text-white font-semibold">${{ loanPrincipal.toLocaleString() }}</div>
            </div>
            <div>
              <div class="text-gray-400">APR</div>
              <div class="text-white font-semibold">{{ loanAPR.toFixed(2) }}%</div>
            </div>
            <div>
              <div class="text-gray-400">Total Interest</div>
              <div class="text-white font-semibold">${{ totalInterest.toLocaleString() }}</div>
            </div>
            <div>
              <div class="text-gray-400">Total Amount</div>
              <div class="text-white font-semibold">${{ totalLoanAmount.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Lease Calculator -->
      <div v-else class="space-y-4">
        <h3 class="text-lg font-semibold">Lease Calculator</h3>
        
        <div class="space-y-4">
          <!-- Capitalized Cost -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Capitalized Cost (MSRP)</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                v-model.number="leaseInputs.capCost"
                type="number"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:border-red-600"
                placeholder="45000"
              />
            </div>
          </div>
  
          <!-- Residual Value Percentage -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Residual Value %</label>
            <input
              v-model.number="leaseInputs.residualPercent"
              type="number"
              step="1"
              min="0"
              max="100"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-600"
              placeholder="55"
            />
            <p class="text-xs text-gray-500 mt-1">
              Residual Value: ${{ residualValue.toLocaleString() }} ({{ leaseInputs.residualPercent }}% of MSRP)
            </p>
          </div>
  
          <!-- Credit Score -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Credit Score</label>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="score in creditScoreRanges"
                :key="score.value"
                @click="leaseInputs.creditScore = score.value"
                class="flex-1 min-w-[100px] py-3 px-2 rounded-lg transition-all text-xs font-medium"
                :class="leaseInputs.creditScore === score.value ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
              >
                {{ score.label }}
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-2">
              Money Factor: {{ leaseMoneyFactor.toFixed(5) }} ({{ leaseAPR.toFixed(2) }}% APR)
            </p>
          </div>
  
          <!-- Lease Term -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Lease Term</label>
            <div class="flex gap-2">
              <button
                v-for="term in [24, 36, 39, 48]"
                :key="term"
                @click="leaseInputs.termMonths = term"
                class="flex-1 py-3 rounded-lg transition-all text-sm font-medium"
                :class="leaseInputs.termMonths === term ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
              >
                {{ term }} mo
              </button>
            </div>
          </div>
  
          <!-- Taxes & Fees -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Monthly Taxes & Fees</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                v-model.number="leaseInputs.taxesAndFees"
                type="number"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:border-red-600"
                placeholder="50"
              />
            </div>
          </div>
  
          <!-- Down Payment -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Down Payment (Cap Reduction)</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                v-model.number="leaseInputs.downPayment"
                type="number"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-8 pr-4 text-white focus:outline-none focus:border-red-600"
                placeholder="0"
              />
            </div>
          </div>
        </div>
  
        <!-- Lease Result -->
        <div class="mt-6 p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-xl border border-red-600/30">
          <div class="text-sm text-gray-400 mb-2">Estimated Monthly Lease Payment</div>
          <div class="text-4xl font-bold text-white mb-4">
            ${{ leaseMonthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div class="text-gray-400">Depreciation</div>
              <div class="text-white font-semibold">${{ depreciation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>
            <div>
              <div class="text-gray-400">Finance Charge</div>
              <div class="text-white font-semibold">${{ financeCharge.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>
            <div>
              <div class="text-gray-400">Total Lease Cost</div>
              <div class="text-white font-semibold">${{ totalLeaseCost.toLocaleString() }}</div>
            </div>
            <div>
              <div class="text-gray-400">Due at Signing</div>
              <div class="text-white font-semibold">${{ leaseInputs.downPayment.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Disclaimer -->
      <div class="text-xs text-gray-500 mt-6 p-4 bg-gray-800/50 rounded-lg">
        * This is an estimate only. Actual payments may vary based on taxes, fees, credit score, and dealer terms. 
        Please consult with your dealer for exact pricing and terms.
      </div>
    </div>
  </template>
  
  <script setup>
const financeType = ref('loan')

const { selections } = useCarConfigurator()

const vehicleQuery = computed(() => {
  const {
    model,
    trim,
    engine,
    transmission,
    driveTrain,
    exteriorColor,
    interiorColor,
    wheels
  } = selections.value

  return {
    model: model || undefined,
    trim: trim || undefined,
    engine: engine || undefined,
    transmission: transmission || undefined,
    driveTrain: driveTrain || undefined,
    exteriorColor: exteriorColor || undefined,
    interiorColor: interiorColor || undefined,
    wheels: wheels || undefined
  }
})

const {
  data: vehiclePriceResponse,
  refresh: refreshVehiclePrice
} = await useFetch('/api/vehicle-price', {
  query: vehicleQuery,
  immediate: false,
  watch: false
})
  
  // Credit Score Ranges
  const creditScoreRanges = [
    { label: 'Excellent\n(750+)', value: 780 },
    { label: 'Good\n(700-749)', value: 725 },
    { label: 'Fair\n(650-699)', value: 675 },
    { label: 'Poor\n(600-649)', value: 625 },
    { label: 'Bad\n(<600)', value: 550 }
  ]
  
  // Loan Calculator State
  const loanInputs = ref({
    vehiclePrice: 45000,
    downPayment: 5000,
    tradeIn: 0,
    incentives: 0,
    creditScore: 725,
    termMonths: 60
  })
  
  // Lease Calculator State
  const leaseInputs = ref({
    capCost: 45000,
    residualPercent: 55,
    creditScore: 725,
    termMonths: 36,
    taxesAndFees: 50,
    downPayment: 0
  })
  
  // APR Based on Credit Score (Loan)
  const loanAPR = computed(() => {
    const score = loanInputs.value.creditScore
    if (score >= 750) return 4.5
    if (score >= 700) return 6.0
    if (score >= 650) return 8.5
    if (score >= 600) return 11.5
    return 15.0
  })
  
  // APR Based on Credit Score (Lease)
  const leaseAPR = computed(() => {
    const score = leaseInputs.value.creditScore
    if (score >= 750) return 4.0
    if (score >= 700) return 5.5
    if (score >= 650) return 7.5
    if (score >= 600) return 10.0
    return 13.0
  })
  
  // Money Factor from APR
  const leaseMoneyFactor = computed(() => {
    return leaseAPR.value / 2400
  })
  
  // Residual Value
  const residualValue = computed(() => {
    return (leaseInputs.value.capCost * leaseInputs.value.residualPercent) / 100
  })
  
  // Loan Calculations
  const loanPrincipal = computed(() => {
    return Math.max(0, loanInputs.value.vehiclePrice - loanInputs.value.downPayment - loanInputs.value.tradeIn - loanInputs.value.incentives)
  })
  
  const loanMonthlyPayment = computed(() => {
    const P = loanPrincipal.value
    const annualRate = loanAPR.value / 100
    const monthlyRate = annualRate / 12
    const n = loanInputs.value.termMonths
  
    if (P <= 0 || n <= 0) return 0
    if (monthlyRate === 0) return P / n
  
    // Payment = P * r / (1 - (1 + r)^-n)
    const payment = P * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n))
    return payment
  })
  
  const totalLoanAmount = computed(() => {
    return loanMonthlyPayment.value * loanInputs.value.termMonths
  })
  
  const totalInterest = computed(() => {
    return Math.max(0, totalLoanAmount.value - loanPrincipal.value)
  })
  
  // Lease Calculations
  const adjustedCapCost = computed(() => {
    return leaseInputs.value.capCost - leaseInputs.value.downPayment
  })
  
  const depreciation = computed(() => {
    const depreciationAmount = adjustedCapCost.value - residualValue.value
    return depreciationAmount / leaseInputs.value.termMonths
  })
  
  const financeCharge = computed(() => {
    return (adjustedCapCost.value + residualValue.value) * leaseMoneyFactor.value
  })
  
  const leaseMonthlyPayment = computed(() => {
    return depreciation.value + financeCharge.value + leaseInputs.value.taxesAndFees
  })
  
  const totalLeaseCost = computed(() => {
    return (leaseMonthlyPayment.value * leaseInputs.value.termMonths) + leaseInputs.value.downPayment
  })

const priceFieldCandidates = [
  'MSRP',
  'msrp',
  'Price',
  'price',
  'BaseMSRP',
  'Base MSRP',
  'BasePrice',
  'Base Price',
  'StartingMSRP',
  'Starting MSRP',
  'StartingPrice',
  'Starting Price',
  'VehiclePrice',
  'Vehicle Price',
  'RetailPrice',
  'Retail Price',
  'Pricing.MSRP',
  'Pricing.Price'
]

function hasVehicleSelection(query) {
  return Object.values(query).some(Boolean)
}

watch(vehicleQuery, (query) => {
  if (hasVehicleSelection(query)) {
    refreshVehiclePrice()
  }
}, { deep: true, immediate: true })

watch(vehiclePriceResponse, (response) => {
  const price = response?.price
  if (typeof price === 'number' && price > 0) {
    loanInputs.value.vehiclePrice = price
    leaseInputs.value.capCost = price
  }
}, { immediate: true })
  </script>