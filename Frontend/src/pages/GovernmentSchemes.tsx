"use client"

import type React from "react"
import { useState } from "react"
import { FileText, Search, CheckCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
  {
    icon: <FileText className="h-8 w-8 text-green-600" />,
    title: "Enter Details",
    description: "Provide your farm and location information",
  },
  {
    icon: <Search className="h-8 w-8 text-green-600" />,
    title: "AI Analysis",
    description: "AI matches you with eligible schemes",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
    title: "Apply Now",
    description: "Apply directly through our platform",
  },
]

const states = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
]

const farmTypes = ["Small (< 2 hectares)", "Medium (2-5 hectares)", "Large (> 5 hectares)"]

const GovernmentSchemes = () => {
  const [state, setState] = useState("")
  const [farmType, setFarmType] = useState("")
  const [age, setAge] = useState("")
  const [crop, setCrop] = useState("")
  const [landSize, setLandSize] = useState("")
  const [ownershipStatus, setOwnershipStatus] = useState("")
  const [income, setIncome] = useState("")
  const [financialNeeds, setFinancialNeeds] = useState("")
  const [challenges, setChallenges] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [schemes, setSchemes] = useState([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const profileData = {
      age,
      typeOfFarming: farmType,
      crop,
      landSize,
      ownershipStatus,
      income,
      currentFinancialNeeds: financialNeeds,
      challengesFaced: challenges,
    }

    if (state && farmType) {
      setIsSearching(true)
      try {
        const response = await fetch("http://172.16.44.59:5000/get_schemes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state,
            profileData,
          }),
        })
        const data = await response.json()
        console.log("Server Response:", data)
        setSchemes(data)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsSearching(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-4">Discover Government Schemes for You</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Find and apply for government schemes tailored to your farming needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Find Eligible Schemes</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your state</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="farm-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Type
                </label>
                <select
                  id="farm-type"
                  value={farmType}
                  onChange={(e) => setFarmType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select farm type</option>
                  {farmTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
                  Crop
                </label>
                <input
                  type="text"
                  id="crop"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="land-size" className="block text-sm font-medium text-gray-700 mb-1">
                  Land Size
                </label>
                <input
                  type="text"
                  id="land-size"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="ownership-status" className="block text-sm font-medium text-gray-700 mb-1">
                  Ownership Status
                </label>
                <select value={ownershipStatus} onChange={(e) => setOwnershipStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required >
                  <option value="">Select ownership type</option>
                  {["owned", "rented", "leased", "shared crops"].map((d) => (<option key={d} value={d}>{d}</option>))}

                </select>
              </div>

              <div>
                <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                  Income
                </label>
                <input
                  type="text"
                  id="income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="financial-needs" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Financial Needs
                </label>
                <select value={financialNeeds} onChange={(e) => setFinancialNeeds(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required >
                  <option value="" className="text-gray-600">Select for which thing you need help</option>
                  {[
                    "Need loan for seeds",
                    "Need loan for fertilizers",
                    "Need loan for pesticides",
                    "Need financial assistance for irrigation",
                    "Need guidance on organic farming",
                    "Need subsidy for farm equipment",
                    "Need help with soil testing",
                    "Need access to better quality seeds",
                    "Need weather updates for farming",
                    "Need pest control solutions",
                    "Need training on modern farming techniques",
                    "Need government schemes information",
                    "Need crop insurance support",
                    "Need help with farm automation",
                    "Need water supply solutions",
                    "Need assistance in selling crops at better prices",
                    "Need transportation support for produce",
                    "Need access to cold storage facilities",
                    "Need help with dairy farming",
                    "Need advice on crop rotation and soil health",
                    "Need solutions for reducing post-harvest losses",
                    "Need access to farm labor",
                    "Need farm security solutions",
                    "Need help with greenhouse setup",
                    "Need financial literacy for managing farm expenses",
                    "Need assistance for livestock care",
                    "Need better connectivity with agricultural experts",
                    "Need access to sustainable farming resources"
                  ].map((d) => (<option key={d} value={d}>{d}</option>))}

                </select>
              </div>
            </div>

            <div>
              <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 mb-1">
                Challenges Faced
              </label>
              <textarea
                id="challenges"
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                required
              ></textarea>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Searching Schemes...
                  </div>
                ) : (
                  "Find Eligible Schemes"
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        <AnimatePresence>
          {schemes.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-16 max-w-4xl mx-auto "
            >
              <h3 className="text-3xl font-bold mb-8 text-center text-green-800">Eligible Schemes</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {schemes.map((scheme, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg  shadow-inner shadow-black"
                  >
                    <h4 className="text-xl font-semibold mb-2 text-green-700">{scheme[0]}</h4>
                    <p className="text-gray-600">{scheme[1]}</p>
                    <button
                      onClick={() => window.open(scheme[2], '_blank', 'noopener,noreferrer')}
                      className="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Apply Now
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          {/* <h3 className="text-2xl font-bold mb-4 text-green-800">Ready to access government support?</h3> */}
          {/* <button
            onClick={() => {}}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Find My Schemes
          </button> */}
        </motion.div>
      </div>
    </div>
  )
}

export default GovernmentSchemes

