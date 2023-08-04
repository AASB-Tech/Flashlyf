"use client"

export default function ProfilePic({ classes, width, height }) {
    return (
        <>
            <img
                className={classes}
                src="example_img.jpg" 
                alt="Profile Picture" 
                width={width} 
                height={height}
            />
        </>
    );
}
