import React, { useState } from "react";

const PassStrength = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState('');
    const [colorState, setColor] = useState('red');

    const handlePass = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        checkStrength(newPassword); // Pass newPassword instead of password
    }

    const checkStrength = (password) => {
        const constraints = [
            { regex: /.{8,}/ }, // At least 8 characters
            { regex: /[A-Z]/ }  // At least one uppercase letter
        ];

        // Count how many constraints are satisfied
        const count = constraints.filter((c) => c.regex.test(password)).length;

        if (count === 2) {
            setStrength('Very Strong');
            setColor('green');
        } else if (count === 1) {
            setStrength('Strong');
            setColor('orange');
        } else {
            setStrength('Weak');
            setColor('red');
        }
    }

    return (
        <div>
            <input 
                type="password" 
                value={password} 
                onChange={handlePass} 
                placeholder="Enter your password" 
            />
            <div>
                <strong>Password strength: </strong>
                <span style={{ color: colorState }}>
                    {strength}
                </span>
            </div>
        </div>
    );
}

export default PassStrength;
