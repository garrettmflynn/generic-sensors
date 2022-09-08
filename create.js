
const handler = (Class, ...args) => {
    let sensor = null;

    return new Promise((resolve, reject) => {

        try {
            sensor = new Class(...args);
            sensor.onerror = (ev) => {
                if (ev.error.name === 'NotAllowedError') reject('Permission to access sensor was denied.');
                else if (ev.error.name == 'NotReadableError') reject('Sensor is not available.');
                else console.error('Error occurred while reading sensor data: ', ev);
            };

            sensor.onactivate = () => resolve(sensor)

            sensor.start();
            
        } catch (error) {
            // Handle construction errors.
            if (error.name === 'SecurityError')reject('Sensor construction was blocked by the Permissions Policy.');
            else if (error.name === 'ReferenceError') reject('Sensor is not supported by the User Agent.');
            else reject(error);
        }
    })

}


export default handler
