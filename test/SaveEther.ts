import { expect } from "chai";
import { ethers } from "hardhat";

describe("SaveEther", function () {
  let saveEther: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    const SaveEther = await ethers.getContractFactory("SaveEther");
    [owner, addr1, addr2] = await ethers.getSigners();
    saveEther = await SaveEther.deploy();
    await saveEther.waitForDeployment(); // ✅ v6 best practice
  });

  it("should allow a user to deposit Ether", async function () {
    const depositAmount = ethers.parseEther("1");

    await expect(saveEther.connect(addr1).deposit({ value: depositAmount }))
      .to.emit(saveEther, "DepositSuccessful")
      .withArgs(await addr1.getAddress(), depositAmount);

    expect(await saveEther.balances(await addr1.getAddress())).to.equal(
      depositAmount
    );
  });

  it("should revert when depositing zero Ether", async function () {
    await expect(saveEther.connect(addr1).deposit({ value: 0n }))
      .to.be.revertedWith("Can't deposit zero value");
  });

  it("should allow a user to withdraw Ether", async function () {
    const depositAmount = ethers.parseEther("1");
    const withdrawAmount = ethers.parseEther("0.5");

    await saveEther.connect(addr1).deposit({ value: depositAmount });

    await expect(saveEther.connect(addr1).withdraw(withdrawAmount))
      .to.emit(saveEther, "WithdrawalSuccessful");

    // ✅ bigint math in v6
    expect(await saveEther.balances(await addr1.getAddress())).to.equal(
      depositAmount - withdrawAmount
    );
  });

  it("should revert withdrawal if insufficient funds", async function () {
    await expect(saveEther.connect(addr1).withdraw(ethers.parseEther("1")))
      .to.be.revertedWith("Insufficient funds");
  });

  it("should revert withdrawal if amount exceeds balance", async function () {
    const depositAmount = ethers.parseEther("1");

    await saveEther.connect(addr1).deposit({ value: depositAmount });

    await expect(saveEther.connect(addr1).withdraw(ethers.parseEther("2")))
      .to.be.revertedWith("You didn't save that much!!!");
  });

  it("should return correct user savings", async function () {
    const depositAmount = ethers.parseEther("1");

    await saveEther.connect(addr1).deposit({ value: depositAmount });

    expect(await saveEther.connect(addr1).getUserSavings()).to.equal(
      depositAmount
    );
  });

  it("should return correct contract balance", async function () {
    const depositAmount = ethers.parseEther("1");

    await saveEther.connect(addr1).deposit({ value: depositAmount });

    expect(await saveEther.getContractBalance()).to.equal(depositAmount);
  });
});