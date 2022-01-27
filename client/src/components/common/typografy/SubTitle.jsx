import React from 'react'

export const SubTitle = ({ children }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15,
        color: 'black'
      }}
    >
      <h3>{children}</h3>
    </div>
  )
}