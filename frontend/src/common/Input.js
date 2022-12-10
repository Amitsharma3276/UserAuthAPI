const Input=(props)=>{
    
    
    return(
        <div className='form-group'>
            <label>{props.isRequired==='true' ? props.label + '*': props.label}</label>
            <input
                onChange={props.onChange}
                type={props.type}
                className={props.className}
                placeholder={props.placeholder}
                values={props.name}
            />
        </div>
    )
};

export default Input;