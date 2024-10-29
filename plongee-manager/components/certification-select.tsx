import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import freedivingCertifications from '../lib/freediving';

interface CertificationSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function CertificationSelect({ value, onValueChange }: CertificationSelectProps) {
  // Flatten all certifications into a single array
  const allCertifications = freedivingCertifications 
    ? Object.entries(freedivingCertifications as Record<string, { levels: string[], instructors: string[] }>).flatMap(
        ([org, data]) => {
          return [...data.levels, ...data.instructors].map(cert => `${org} - ${cert}`);
        }
      )
    : [];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select certification level">
          {value?.replace(/^[^-]+ - /, '') || value}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {allCertifications.map((cert) => (
          <SelectItem key={cert} value={cert}>
            {cert}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}