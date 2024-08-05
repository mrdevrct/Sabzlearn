import React from 'react'

export default function FilterBox({ operator , onFilterChange  }) {

  return (
    <div className="h-[4rem] bg-white rounded-xl p-5 hidden md:block">
    <div className="flex items-center justify-between">
      <span className="font-danaDemibold">{operator}</span>
      <label className="toggle" >
        <input
          className="toggle__input"
          type="checkbox"
          name="only_free"
          value="yes"
          onClick={()=> onFilterChange(event , operator)}
        />
        <span className="toggle__marker"></span>
      </label>
    </div>
  </div>
  )
}
