import React from 'react'

const Finish = (props) => {

const handleFinish = () =>{
    console.log(props.objectData)
}

    React.useEffect(() => {
        handleFinish();
    }, []);
    
  return (
    <div>
      Your registration is finished 
    </div>
  )
}

export default Finish
