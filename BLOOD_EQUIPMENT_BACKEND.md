# Blood Equipment Backend Implementation

This document provides complete backend code for the Blood Equipment module following your existing architecture patterns.

---

## 📁 File Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── bloodEquipment.controller.ts
│   ├── services/
│   │   └── bloodEquipment.service.ts
│   └── routes/
│       └── bloodEquipment.routes.ts
```

---

## 1. Controller: `controllers/bloodEquipment.controller.ts`

```typescript
import { Request, Response } from 'express';
import { BloodEquipmentService } from '../services/bloodEquipment.service';

export class BloodEquipmentController {
  private bloodEquipmentService: BloodEquipmentService;

  constructor() {
    this.bloodEquipmentService = new BloodEquipmentService();
  }

  /**
   * GET /api/blood-equipment
   * Get all blood equipment
   */
  async getAllEquipment(req: Request, res: Response): Promise<Response> {
    try {
      const equipment = await this.bloodEquipmentService.getAllEquipment();
      
      return res.status(200).json({
        success: true,
        data: equipment,
        message: 'Equipment retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching equipment:', error);
      return res.status(500).json({
        success: false,
        data: null,
        message: 'Failed to retrieve equipment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/blood-equipment/:id
   * Get single equipment by ID
   */
  async getEquipmentById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          data: null,
          message: 'Equipment ID is required'
        });
      }

      const equipment = await this.bloodEquipmentService.getEquipmentById(id);

      if (!equipment) {
        return res.status(404).json({
          success: false,
          data: null,
          message: 'Equipment not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: equipment,
        message: 'Equipment retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching equipment by ID:', error);
      return res.status(500).json({
        success: false,
        data: null,
        message: 'Failed to retrieve equipment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/blood-equipment/establishment/:medEstId
   * Get equipment by medical establishment ID
   */
  async getEquipmentByEstablishment(req: Request, res: Response): Promise<Response> {
    try {
      const { medEstId } = req.params;

      if (!medEstId) {
        return res.status(400).json({
          success: false,
          data: null,
          message: 'Medical establishment ID is required'
        });
      }

      const equipment = await this.bloodEquipmentService.getEquipmentByEstablishment(medEstId);

      return res.status(200).json({
        success: true,
        data: equipment,
        message: 'Equipment retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching equipment by establishment:', error);
      return res.status(500).json({
        success: false,
        data: null,
        message: 'Failed to retrieve equipment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * POST /api/blood-equipment
   * Create new equipment
   */
  async createEquipment(req: Request, res: Response): Promise<Response> {
    try {
      const {
        type,
        serialNumber,
        manufacturer,
        model,
        purchaseDate,
        warrantyExpiry,
        locatedMedEstId,
        status
      } = req.body;

      // Validation
      if (!type || !serialNumber || !manufacturer || !model || !purchaseDate || !warrantyExpiry || !locatedMedEstId || !status) {
        return res.status(400).json({
          success: false,
          data: null,
          message: 'All required fields must be provided: type, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, locatedMedEstId, status'
        });
      }

      // Validate status enum
      const validStatuses = ['OPERATIONAL', 'MAINTENANCE', 'DECOMMISSIONED'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          data: null,
          message: 'Invalid status. Must be one of: OPERATIONAL, MAINTENANCE, DECOMMISSIONED'
        });
      }

      const equipmentData = {
        type,
        serialNumber,
        manufacturer,
        model,
        purchaseDate: new Date(purchaseDate),
        warrantyExpiry: new Date(warrantyExpiry),
        locatedMedEstId,
        status
      };

      const newEquipment = await this.bloodEquipmentService.createEquipment(equipmentData);

      return res.status(201).json({
        success: true,
        data: newEquipment,
        message: 'Equipment created successfully'
      });
    } catch (error) {
      console.error('Error creating equipment:', error);
      return res.status(500).json({
        success: false,
        data: null,
        message: 'Failed to create equipment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * PUT /api/blood-equipment/:id
   * Update equipment
   */
  async updateEquipment(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          data: null,
          message: 'Equipment ID is required'
        });
      }

      // Check if equipment exists
      const existingEquipment = await this.bloodEquipmentService.getEquipmentById(id);
      if (!existingEquipment) {
        return res.status(404).json({
          success: false,
          data: null,
          message: 'Equipment not found'
        });
      }

      // Validate status if provided
      if (updateData.status) {
        const validStatuses = ['OPERATIONAL', 'MAINTENANCE', 'DECOMMISSIONED'];
        if (!validStatuses.includes(updateData.status)) {
          return res.status(400).json({
            success: false,
            data: null,
            message: 'Invalid status. Must be one of: OPERATIONAL, MAINTENANCE, DECOMMISSIONED'
          });
        }
      }

      // Convert date strings to Date objects if provided
      if (updateData.purchaseDate) {
        updateData.purchaseDate = new Date(updateData.purchaseDate);
      }
      if (updateData.warrantyExpiry) {
        updateData.warrantyExpiry = new Date(updateData.warrantyExpiry);
      }

      const updatedEquipment = await this.bloodEquipmentService.updateEquipment(id, updateData);

      return res.status(200).json({
        success: true,
        data: updatedEquipment,
        message: 'Equipment updated successfully'
      });
    } catch (error) {
      console.error('Error updating equipment:', error);
      return res.status(500).json({
        success: false,
        data: null,
        message: 'Failed to update equipment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * DELETE /api/blood-equipment/:id
   * Delete equipment
   */
  async deleteEquipment(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          data: null,
          message: 'Equipment ID is required'
        });
      }

      // Check if equipment exists
      const existingEquipment = await this.bloodEquipmentService.getEquipmentById(id);
      if (!existingEquipment) {
        return res.status(404).json({
          success: false,
          data: null,
          message: 'Equipment not found'
        });
      }

      await this.bloodEquipmentService.deleteEquipment(id);

      return res.status(200).json({
        success: true,
        data: null,
        message: 'Equipment deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting equipment:', error);
      return res.status(500).json({
        success: false,
        data: null,
        message: 'Failed to delete equipment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
```

---

## 2. Service: `services/bloodEquipment.service.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateEquipmentData {
  type: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  purchaseDate: Date;
  warrantyExpiry: Date;
  locatedMedEstId: string;
  status: string;
}

interface UpdateEquipmentData {
  type?: string;
  serialNumber?: string;
  manufacturer?: string;
  model?: string;
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  locatedMedEstId?: string;
  status?: string;
}

export class BloodEquipmentService {
  /**
   * Get all equipment with related data
   */
  async getAllEquipment() {
    return await prisma.equipment.findMany({
      include: {
        medicalEstablishment: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        calibrationLogs: {
          orderBy: {
            calibrationDate: 'desc',
          },
        },
        maintenanceLogs: {
          orderBy: {
            maintenanceDate: 'desc',
          },
        },
      },
      orderBy: {
        purchaseDate: 'desc',
      },
    });
  }

  /**
   * Get equipment by ID with related data
   */
  async getEquipmentById(id: string) {
    return await prisma.equipment.findUnique({
      where: { id },
      include: {
        medicalEstablishment: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        calibrationLogs: {
          orderBy: {
            calibrationDate: 'desc',
          },
        },
        maintenanceLogs: {
          orderBy: {
            maintenanceDate: 'desc',
          },
        },
      },
    });
  }

  /**
   * Get equipment by medical establishment ID
   */
  async getEquipmentByEstablishment(medEstId: string) {
    return await prisma.equipment.findMany({
      where: {
        locatedMedEstId: medEstId,
      },
      include: {
        medicalEstablishment: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        calibrationLogs: {
          orderBy: {
            calibrationDate: 'desc',
          },
          take: 5, // Get last 5 calibration logs
        },
        maintenanceLogs: {
          orderBy: {
            maintenanceDate: 'desc',
          },
          take: 5, // Get last 5 maintenance logs
        },
      },
      orderBy: {
        purchaseDate: 'desc',
      },
    });
  }

  /**
   * Create new equipment
   */
  async createEquipment(data: CreateEquipmentData) {
    return await prisma.equipment.create({
      data: {
        type: data.type,
        serialNumber: data.serialNumber,
        manufacturer: data.manufacturer,
        model: data.model,
        purchaseDate: data.purchaseDate,
        warrantyExpiry: data.warrantyExpiry,
        locatedMedEstId: data.locatedMedEstId,
        status: data.status,
      },
      include: {
        medicalEstablishment: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        calibrationLogs: true,
        maintenanceLogs: true,
      },
    });
  }

  /**
   * Update equipment
   */
  async updateEquipment(id: string, data: UpdateEquipmentData) {
    return await prisma.equipment.update({
      where: { id },
      data: data,
      include: {
        medicalEstablishment: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        calibrationLogs: {
          orderBy: {
            calibrationDate: 'desc',
          },
        },
        maintenanceLogs: {
          orderBy: {
            maintenanceDate: 'desc',
          },
        },
      },
    });
  }

  /**
   * Delete equipment
   */
  async deleteEquipment(id: string) {
    // Note: This will cascade delete related calibration and maintenance logs
    // if your Prisma schema has onDelete: Cascade configured
    return await prisma.equipment.delete({
      where: { id },
    });
  }

  /**
   * Get equipment by status
   */
  async getEquipmentByStatus(status: string) {
    return await prisma.equipment.findMany({
      where: { status },
      include: {
        medicalEstablishment: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });
  }

  /**
   * Get equipment with expired warranty
   */
  async getEquipmentWithExpiredWarranty() {
    const now = new Date();
    return await prisma.equipment.findMany({
      where: {
        warrantyExpiry: {
          lt: now,
        },
      },
      include: {
        medicalEstablishment: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });
  }
}
```

---

## 3. Routes: `routes/bloodEquipment.routes.ts`

```typescript
import { Router } from 'express';
import { BloodEquipmentController } from '../controllers/bloodEquipment.controller';

const router = Router();
const bloodEquipmentController = new BloodEquipmentController();

/**
 * @route   GET /api/blood-equipment
 * @desc    Get all blood equipment
 * @access  Private (add authentication middleware as needed)
 */
router.get(
  '/',
  (req, res) => bloodEquipmentController.getAllEquipment(req, res)
);

/**
 * @route   GET /api/blood-equipment/:id
 * @desc    Get single equipment by ID
 * @access  Private
 */
router.get(
  '/:id',
  (req, res) => bloodEquipmentController.getEquipmentById(req, res)
);

/**
 * @route   GET /api/blood-equipment/establishment/:medEstId
 * @desc    Get equipment by medical establishment ID
 * @access  Private
 */
router.get(
  '/establishment/:medEstId',
  (req, res) => bloodEquipmentController.getEquipmentByEstablishment(req, res)
);

/**
 * @route   POST /api/blood-equipment
 * @desc    Create new equipment
 * @access  Private
 */
router.post(
  '/',
  (req, res) => bloodEquipmentController.createEquipment(req, res)
);

/**
 * @route   PUT /api/blood-equipment/:id
 * @desc    Update equipment
 * @access  Private
 */
router.put(
  '/:id',
  (req, res) => bloodEquipmentController.updateEquipment(req, res)
);

/**
 * @route   DELETE /api/blood-equipment/:id
 * @desc    Delete equipment
 * @access  Private
 */
router.delete(
  '/:id',
  (req, res) => bloodEquipmentController.deleteEquipment(req, res)
);

export default router;
```

---

## 4. Main App Integration

Add this to your main `app.ts` or `server.ts`:

```typescript
import bloodEquipmentRoutes from './routes/bloodEquipment.routes';

// ... other imports and setup

// Register blood equipment routes
app.use('/api/blood-equipment', bloodEquipmentRoutes);
```

---

## 5. Prisma Schema (Reference)

Ensure your Prisma schema includes the Equipment model:

```prisma
model Equipment {
  id                      String              @id @default(cuid())
  type                    String              // e.g., REFRIGERATOR, CENTRIFUGE
  serialNumber            String              @unique
  manufacturer            String
  model                   String
  purchaseDate            DateTime
  warrantyExpiry          DateTime
  locatedMedEstId         String
  status                  String              // OPERATIONAL, MAINTENANCE, DECOMMISSIONED
  medicalEstablishment    MedicalEstablishment @relation(fields: [locatedMedEstId], references: [id])
  calibrationLogs         CalibrationLog[]
  maintenanceLogs         MaintenanceLog[]
  createdAt               DateTime            @default(now())
  updatedAt               DateTime            @updatedAt

  @@index([locatedMedEstId])
  @@index([status])
  @@map("equipment")
}

model CalibrationLog {
  id                   String    @id @default(cuid())
  equipmentId          String
  calibrationDate      DateTime
  nextCalibrationDate  DateTime
  performedBy          String
  result               String
  notes                String?
  equipment            Equipment @relation(fields: [equipmentId], references: [id], onDelete: Cascade)
  createdAt            DateTime  @default(now())

  @@index([equipmentId])
  @@map("calibration_logs")
}

model MaintenanceLog {
  id              String    @id @default(cuid())
  equipmentId     String
  maintenanceDate DateTime
  maintenanceType String
  performedBy     String
  cost            Float?
  notes           String?
  equipment       Equipment @relation(fields: [equipmentId], references: [id], onDelete: Cascade)
  createdAt       DateTime  @default(now())

  @@index([equipmentId])
  @@map("maintenance_logs")
}

model MedicalEstablishment {
  id        String      @id @default(cuid())
  name      String
  address   String
  equipment Equipment[]
  // ... other fields
  
  @@map("medical_establishments")
}
```

---

## 6. Postman Test Collection

### Collection Setup
**Base URL:** `http://localhost:5000/api/blood-equipment`

---

### Test 1: Create Equipment (POST)

**Endpoint:** `POST http://localhost:5000/api/blood-equipment`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "type": "REFRIGERATOR",
  "serialNumber": "RF-2024-003",
  "manufacturer": "Panasonic Healthcare",
  "model": "MBR-305D",
  "purchaseDate": "2024-04-18T00:00:00.000Z",
  "warrantyExpiry": "2027-04-18T00:00:00.000Z",
  "locatedMedEstId": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
  "status": "OPERATIONAL"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "eq-007",
    "type": "REFRIGERATOR",
    "serialNumber": "RF-2024-003",
    "manufacturer": "Panasonic Healthcare",
    "model": "MBR-305D",
    "purchaseDate": "2024-04-18T00:00:00.000Z",
    "warrantyExpiry": "2027-04-18T00:00:00.000Z",
    "locatedMedEstId": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
    "status": "OPERATIONAL",
    "medicalEstablishment": {
      "id": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
      "name": "Blood Bank Dehiwala",
      "address": "Dehiwala"
    },
    "calibrationLogs": [],
    "maintenanceLogs": []
  },
  "message": "Equipment created successfully"
}
```

---

### Test 2: Get All Equipment (GET)

**Endpoint:** `GET http://localhost:5000/api/blood-equipment`

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "eq-006",
      "type": "REFRIGERATOR",
      "serialNumber": "RF-2024-002",
      "manufacturer": "Panasonic Healthcare",
      "model": "MBR-305D",
      "purchaseDate": "2024-04-18T00:00:00.000Z",
      "warrantyExpiry": "2027-04-18T00:00:00.000Z",
      "locatedMedEstId": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
      "status": "OPERATIONAL",
      "medicalEstablishment": {
        "id": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
        "name": "Blood Bank Dehiwala",
        "address": "Dehiwala"
      },
      "calibrationLogs": [],
      "maintenanceLogs": []
    }
  ],
  "message": "Equipment retrieved successfully"
}
```

---

### Test 3: Get Equipment by ID (GET)

**Endpoint:** `GET http://localhost:5000/api/blood-equipment/eq-006`

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "eq-006",
    "type": "REFRIGERATOR",
    "serialNumber": "RF-2024-002",
    "manufacturer": "Panasonic Healthcare",
    "model": "MBR-305D",
    "purchaseDate": "2024-04-18T00:00:00.000Z",
    "warrantyExpiry": "2027-04-18T00:00:00.000Z",
    "locatedMedEstId": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
    "status": "OPERATIONAL",
    "medicalEstablishment": {
      "id": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
      "name": "Blood Bank Dehiwala",
      "address": "Dehiwala"
    },
    "calibrationLogs": [],
    "maintenanceLogs": []
  },
  "message": "Equipment retrieved successfully"
}
```

---

### Test 4: Get Equipment by Establishment (GET)

**Endpoint:** `GET http://localhost:5000/api/blood-equipment/establishment/73d67585-efd9-4a62-9554-ca1fe1e2ab85`

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "eq-006",
      "type": "REFRIGERATOR",
      "serialNumber": "RF-2024-002",
      "manufacturer": "Panasonic Healthcare",
      "model": "MBR-305D",
      "purchaseDate": "2024-04-18T00:00:00.000Z",
      "warrantyExpiry": "2027-04-18T00:00:00.000Z",
      "locatedMedEstId": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
      "status": "OPERATIONAL",
      "medicalEstablishment": {
        "id": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
        "name": "Blood Bank Dehiwala",
        "address": "Dehiwala"
      },
      "calibrationLogs": [],
      "maintenanceLogs": []
    }
  ],
  "message": "Equipment retrieved successfully"
}
```

---

### Test 5: Update Equipment (PUT)

**Endpoint:** `PUT http://localhost:5000/api/blood-equipment/eq-006`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "status": "MAINTENANCE",
  "type": "REFRIGERATOR (Updated)"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "eq-006",
    "type": "REFRIGERATOR (Updated)",
    "serialNumber": "RF-2024-002",
    "manufacturer": "Panasonic Healthcare",
    "model": "MBR-305D",
    "purchaseDate": "2024-04-18T00:00:00.000Z",
    "warrantyExpiry": "2027-04-18T00:00:00.000Z",
    "locatedMedEstId": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
    "status": "MAINTENANCE",
    "medicalEstablishment": {
      "id": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
      "name": "Blood Bank Dehiwala",
      "address": "Dehiwala"
    },
    "calibrationLogs": [],
    "maintenanceLogs": []
  },
  "message": "Equipment updated successfully"
}
```

---

### Test 6: Delete Equipment (DELETE)

**Endpoint:** `DELETE http://localhost:5000/api/blood-equipment/eq-006`

**Expected Response (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Equipment deleted successfully"
}
```

---

### Test 7: Error Cases

#### Missing Required Field (POST)

**Endpoint:** `POST http://localhost:5000/api/blood-equipment`

**Body:**
```json
{
  "type": "REFRIGERATOR",
  "serialNumber": "RF-2024-004"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "data": null,
  "message": "All required fields must be provided: type, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, locatedMedEstId, status"
}
```

#### Equipment Not Found (GET)

**Endpoint:** `GET http://localhost:5000/api/blood-equipment/invalid-id`

**Expected Response (404):**
```json
{
  "success": false,
  "data": null,
  "message": "Equipment not found"
}
```

#### Invalid Status (POST/PUT)

**Endpoint:** `POST http://localhost:5000/api/blood-equipment`

**Body:**
```json
{
  "type": "REFRIGERATOR",
  "serialNumber": "RF-2024-005",
  "manufacturer": "Test",
  "model": "Test",
  "purchaseDate": "2024-04-18T00:00:00.000Z",
  "warrantyExpiry": "2027-04-18T00:00:00.000Z",
  "locatedMedEstId": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
  "status": "INVALID_STATUS"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "data": null,
  "message": "Invalid status. Must be one of: OPERATIONAL, MAINTENANCE, DECOMMISSIONED"
}
```

---

## 7. cURL Examples

### Create Equipment
```bash
curl -X POST http://localhost:5000/api/blood-equipment \
  -H "Content-Type: application/json" \
  -d '{
    "type": "REFRIGERATOR",
    "serialNumber": "RF-2024-003",
    "manufacturer": "Panasonic Healthcare",
    "model": "MBR-305D",
    "purchaseDate": "2024-04-18T00:00:00.000Z",
    "warrantyExpiry": "2027-04-18T00:00:00.000Z",
    "locatedMedEstId": "73d67585-efd9-4a62-9554-ca1fe1e2ab85",
    "status": "OPERATIONAL"
  }'
```

### Get All Equipment
```bash
curl -X GET http://localhost:5000/api/blood-equipment
```

### Get Equipment by ID
```bash
curl -X GET http://localhost:5000/api/blood-equipment/eq-006
```

### Update Equipment
```bash
curl -X PUT http://localhost:5000/api/blood-equipment/eq-006 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "MAINTENANCE"
  }'
```

### Delete Equipment
```bash
curl -X DELETE http://localhost:5000/api/blood-equipment/eq-006
```

---

## 8. Testing Checklist

- [ ] All equipment retrieved successfully (GET /)
- [ ] Single equipment retrieved by ID (GET /:id)
- [ ] Equipment retrieved by establishment (GET /establishment/:medEstId)
- [ ] New equipment created successfully (POST /)
- [ ] Equipment updated successfully (PUT /:id)
- [ ] Equipment deleted successfully (DELETE /:id)
- [ ] 400 error for missing required fields
- [ ] 404 error for non-existent equipment
- [ ] 400 error for invalid status enum
- [ ] Related medicalEstablishment data included
- [ ] Calibration and maintenance logs included
- [ ] Date fields properly formatted

---

## 9. Additional Notes

### Authentication
Add authentication middleware to protect routes:

```typescript
import { authMiddleware } from '../middleware/auth.middleware';

router.post('/', authMiddleware, (req, res) => 
  bloodEquipmentController.createEquipment(req, res)
);
```

### Pagination
For large datasets, add pagination to the GET all route:

```typescript
// In controller
async getAllEquipment(req: Request, res: Response): Promise<Response> {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [equipment, total] = await Promise.all([
    this.bloodEquipmentService.getAllEquipment(skip, limit),
    this.bloodEquipmentService.countEquipment()
  ]);

  return res.status(200).json({
    success: true,
    data: equipment,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    message: 'Equipment retrieved successfully'
  });
}
```

### Logging
Add logging for better debugging:

```typescript
import logger from '../utils/logger';

logger.info('Creating new equipment', { serialNumber: req.body.serialNumber });
logger.error('Error creating equipment', { error, userId: req.user.id });
```

---

## Frontend Integration Complete ✅

The frontend pages have been created and are ready to use:

1. **List Page**: `http://localhost:3000/blood_bank/equipment`
2. **Detail Page**: `http://localhost:3000/blood_bank/equipment/[id]`

The frontend automatically:
- Fetches data using RTK Query
- Handles loading and error states
- Provides search and filtering
- Displays equipment in tables
- Shows related medical establishment info
- Displays calibration and maintenance logs
- Allows editing and deleting equipment

---

**End of Documentation**
