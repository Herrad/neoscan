import React from 'react'
import TargetDamageFileWatcher from './analyse/watchers/targetDamageScan';

const DPSCounter = ({ characterName, basePath }) => {
  const [shots, setShots] = useState([]);
  let dpsWindow = undefined;

  const clearShots = () => {
    setShots([]);
  }

  const handleShotFired = logs => {
    if (!dpsWindow) dpsWindow = setTimeout(() => setShots([]), 1000);

  }

  useEffect(() => {
    if (characterName) {
      const targetDamageFileWatcher = new TargetDamageFileWatcher({
        render: logs => {
          if (!logs.length) return;
          handleShotFired(logs)
        }
      })
      targetDamageFileWatcher.scan({}, basePath)
    }
  }, []);
  return <div id="dpsCounter">

  </div>
}

export default DPSCounter;