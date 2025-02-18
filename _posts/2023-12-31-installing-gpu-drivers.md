---
title: "Installing NVIDIA GPU Drivers on Ubuntu 20.04 (Offline Guide)"
date: 2023-12-31 17:10:00 -0500
layout: default
tags: [ubuntu, nvidia, gpu, drivers, tutorial]
description: "A comprehensive guide for installing NVIDIA GPU drivers on Ubuntu 20.04 without internet access, specifically for GTX 1080 GPUs."
---
# Installing Nvidia GPU drivers on Ubuntu 20.04 for 1080 GPU 

As a machine learning developer, you'l often find yourself installing programs and applications developed by others. Sometimes if you aren't careful, they're changes can overwrite files used by you. This leads to situations like the one I faced recently. 
A unamed program borked my desktop so bad that i needed to reinstall the drivers for my gpu without having ready access to the internet. So this guide is a way to have this information handy. 

# This is a guide to installing Nvidia GPU drivers on Ubuntu 20.04 for a 1080 GPU. 

## Installing NVIDIA Drivers for GTX 1080 on Ubuntu 20 (Offline)

### Prerequisites
1. Download the required NVIDIA driver package from the official [NVIDIA website](https://www.nvidia.com/Download/index.aspx) on a system with internet access.
2. Transfer the downloaded driver package to your Ubuntu 20 machine using a USB drive or other offline transfer method.

### Step 1: Update System Packages

Ensure your system is up-to-date (even offline) to avoid compatibility issues:

```bash
sudo apt update && sudo apt upgrade -y
```

(Optional) If you need additional system updates, you can download the necessary package files (.deb) on another machine and manually transfer them.

---

### Step 2: Prepare for NVIDIA Driver Installation

#### a. Blacklist the Nouveau Driver

1. Create a configuration file to disable the Nouveau driver:

   ```bash
   sudo nano /etc/modprobe.d/blacklist-nouveau.conf
   ```

2. Add the following lines:

   ```plaintext
   blacklist nouveau
   options nouveau modeset=0
   ```

3. Regenerate the kernel initramfs:

   ```bash
   sudo update-initramfs -u
   ```

4. Reboot the machine:

   ```bash
   sudo reboot
   ```

---

### Step 3: Install Build Tools

NVIDIA drivers require some build tools to compile kernel modules. Install them using:

```bash
sudo apt install build-essential gcc make dkms -y
```

If offline, download the `.deb` packages for these dependencies from a system with internet access and install them using `dpkg`:

```bash
sudo dpkg -i /path/to/package.deb
```

---

### Step 4: Install the NVIDIA Driver

1. Navigate to the directory where the driver file is stored:

   ```bash
   cd /path/to/driver
   ```

2. Make the downloaded driver file executable:

   ```bash
   chmod +x NVIDIA-Linux-x86_64-<version>.run
   ```

3. Run the installer:

   ```bash
   sudo ./NVIDIA-Linux-x86_64-<version>.run  # Sub in your version! 
   ```

   Replace `<version>` with the specific driver version you downloaded (e.g., `NVIDIA-Linux-x86_64-470.141.03.run`).

4. Follow the on-screen instructions:
   - Accept the license agreement.
   - Choose the default options unless you have specific requirements.

5. Once the installation is complete, reboot the system:

   ```bash
   sudo reboot
   ```

---

### Step 5: Verify Installation

After rebooting, check if the NVIDIA driver is installed and functioning correctly:

```bash
nvidia-smi
```

This command should display information about your NVIDIA GPU, including the driver version.

---

### Troubleshooting

- **Error: "Unable to load the NVIDIA kernel module"**
  - Ensure Secure Boot is disabled in your BIOS settings. ** this is something that I had to do.**
  - Reboot and retry the driver installation.

- **Dependency Issues:**
  - Use `dpkg -i` to install missing dependencies manually.

---

### Notes

- This guide assumes basic familiarity with Ubuntu and the terminal.
- If additional dependencies are needed, download them on another system and transfer them to the Ubuntu machine.





