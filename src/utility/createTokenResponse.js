import { v4 as uuidv4 } from 'uuid';
function generateTokenResponseId() {
    return uuidv4();
  }

export default generateTokenResponseId;
