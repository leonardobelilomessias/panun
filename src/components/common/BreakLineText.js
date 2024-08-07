import React from "react";

const BreakLineText = ({ text }) => {
    const formatDescription = (text) => {
        return text.split('\n').map((item, index) => (
            <React.Fragment key={index}>
                {item}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div>
            {formatDescription(text)}
        </div>
    );
};

export default BreakLineText;