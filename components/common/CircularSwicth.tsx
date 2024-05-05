import * as React from 'react';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';

interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  value?: any;
}

const CircularSwitch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <>
      {/* <div className="flex items-center"> */}
      {/* <label className="mr-2">{label}</label> */}
      <ShadcnSwitch
        checked={checked}
        onCheckedChange={(isChecked: boolean) => onChange(isChecked)}
      />
      {/* </div> */}
    </>
  );
};

export default CircularSwitch;
